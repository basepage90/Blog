package controllers

import (
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
	"github.com/woojebiz/gin-web/middleware"
	"github.com/woojebiz/gin-web/models"
	"github.com/woojebiz/gin-web/services"
	"gopkg.in/go-playground/validator.v9"
)

type LoginController interface {
	ShowLogin(ctx *gin.Context)
	Login(ctx *gin.Context)
	Signup(ctx *gin.Context)
	Certificate(ctx *gin.Context)
}

type loginController struct {
	loginService services.LoginService
	jWtService   services.JWTService
}

var validate *validator.Validate

func NewLoginController(loginService services.LoginService,
	jWtService services.JWTService) LoginController {
	validate = validator.New()
	validate.RegisterValidation("is-null", middleware.ValidateNull)
	return &loginController{
		loginService: loginService,
		jWtService:   jWtService,
	}
}

func (con *loginController) ShowLogin(c *gin.Context) {
	Render(c, gin.H{}, "login.html")
}

func (con *loginController) Login(ctx *gin.Context) {
	var user models.User

	if err := ctx.ShouldBind(&user); err != nil {
		ctx.JSON(http.StatusUnauthorized, gin.H{"err": err.Error()})
		return
	}

	if resNum := con.loginService.FindAndCerti(user); resNum == 1 { // 1) 이메일 미존재
		ctx.JSON(http.StatusUnauthorized, gin.H{"err": 1})
		return
	} else if resNum == 2 { // 2) 이메일 존재 / 메일 미인증
		if err := con.loginService.Login(user); err == nil {
			// uuid 생성 db update
			uuidKey := uuid.New().String()
			user.Uuid = uuidKey
			uuidSaveErr := con.loginService.SaveUUID(user)
			if uuidSaveErr == nil {
				// 인증메일 발송
				middleware.SendCertiMail(user)
				ctx.JSON(http.StatusUnauthorized, gin.H{"err": 2})
				return
			}
			ctx.JSON(http.StatusUnauthorized, gin.H{"err": uuidSaveErr.Error()})
			return
		} else {
			// 로그인 에러
			ctx.JSON(http.StatusUnauthorized, gin.H{"err": err.Error()})
			return
		}
	} else { // 3) 이메일 존재 / 메일 인증
		if token, err := con.getLogin(ctx, user); token != "" {
			// cookie 저장 방식
			ctx.SetCookie("access-token", token, 60*60*24, "/", "localhost:8080", false, true)
		} else {
			// 로그인 에러
			ctx.JSON(http.StatusUnauthorized, gin.H{"err": err.Error()})
		}
	}
}

func (con *loginController) getLogin(ctx *gin.Context, user models.User) (string, error) {
	err := con.loginService.Login(user)
	if err == nil {
		return con.jWtService.GenerateToken(user.Email, true), nil
	}
	return "", err
}

func (con *loginController) Signup(ctx *gin.Context) {
	var user models.User
	err := ctx.ShouldBind(&user)
	if err != nil {
		ctx.JSON(http.StatusUnauthorized, gin.H{"err": err.Error()})
		return
	}

	if err = validate.Struct(user); err != nil {
		ctx.JSON(http.StatusUnauthorized, gin.H{"err": err.Error()})
		return
	}

	if err = con.loginService.Signup(user); err == nil {
		ctx.JSON(http.StatusOK, gin.H{})
		return
	} else {
		ctx.JSON(http.StatusUnauthorized, gin.H{"err": err.Error()})
		return
	}
}

func (con *loginController) Certificate(ctx *gin.Context) {
	certi_key := ctx.Param("certi_key")

	fmt.Println(certi_key)

	err := con.loginService.Certificate(certi_key)

	if err == nil {
		Render(ctx, gin.H{}, "login.html")
		return
	}

	ctx.JSON(http.StatusUnauthorized, gin.H{"err": err.Error()})

}
