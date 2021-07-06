package controllers

import (
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
	"github.com/woojebiz/gin-web/server/middleware"
	"github.com/woojebiz/gin-web/server/models"
	"github.com/woojebiz/gin-web/server/services"
	"gopkg.in/go-playground/validator.v9"
)

// type account struct {
// 	Email string `json:"email"`
// }

// type properties struct {
// 	Nickname string `json:"nickname"`
// }

type LoginController interface {
	ShowLogin(ctx *gin.Context)
	Login(ctx *gin.Context)
	Signup(ctx *gin.Context)
	Certificate(ctx *gin.Context)
	LoginKakao(ctx *gin.Context)
	GetLoginKakao(ctx *gin.Context)
	DeleteToken(ctx *gin.Context)
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
			ctx.SetCookie("crispy-token", token, 60*60*24, "/", "wjk.ddns.net", false, true)
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

	err := con.loginService.Certificate(certi_key)

	if err == nil {
		Render(ctx, gin.H{}, "login.html")
		return
	}

	ctx.JSON(http.StatusUnauthorized, gin.H{"err": err.Error()})

}

func (con *loginController) LoginKakao(ctx *gin.Context) {
	/* 01. Request token with kakao code */
	host_url := "https://kauth.kakao.com/oauth/token"
	grant_type := "grant_type=authorization_code"
	client_id := "client_id=17e2b41913f7f223f6c370c7cfe2d33b"
	redirect_uri := "redirect_uri=http://wjk.ddns.net:5000/login/kakao"
	code := "code=" + ctx.Query("code")

	requestURL := fmt.Sprintf(
		"%s?%s&%s&%s&%s",
		host_url,
		grant_type,
		client_id,
		redirect_uri,
		code)

	Render(ctx, gin.H{"requestURL": requestURL}, "login_sns.html")

}

func (con *loginController) GetLoginKakao(ctx *gin.Context) {
	var user models.User
	email, nickname, _ := con.loginService.GetKakaoInfo(ctx)
	user.Email = email
	user.Nickname = nickname

	if user.Email == "" {
		ctx.JSON(http.StatusUnauthorized, gin.H{"err": "kakao login error"})
		return
	}

	res, err := con.loginService.GetLoginSNS(user)

	if res.Email != "" { /* 01. 이미 회원인 경우*/

		// 자체 토큰 발행
		if token := con.jWtService.GenerateToken(user.Email, true); token != "" {
			// cookie 저장 방식
			ctx.SetCookie("crispy-token", token, 60*60*24, "/", "wjk.ddns.net", false, true)
		} else {
			// 로그인 에러
			ctx.JSON(http.StatusUnauthorized, gin.H{"err": err.Error()})
		}
	} else { /* 02. 아직 회원이 아닌 경우*/
		// 회원가입 진행
		user.Certificate = true
		signupErr := con.loginService.SignupSNS(user)

		if signupErr != nil {
			panic(signupErr)
		}
		// 자체 토큰 발행
		if token := con.jWtService.GenerateToken(user.Email, true); token != "" {
			// cookie 저장 방식
			ctx.SetCookie("crispy-token", token, 60*60*24, "/", "wjk.ddns.net", false, true)
		} else {
			// 로그인 에러
			ctx.JSON(http.StatusUnauthorized, gin.H{"err": signupErr.Error()})
		}

	}

}

func (con *loginController) DeleteToken(ctx *gin.Context) {
	// Delete cookie : 3rd param is -1
	ctx.SetCookie("crispy-token", "", -1, "/", "wjk.ddns.net", false, true)
}
