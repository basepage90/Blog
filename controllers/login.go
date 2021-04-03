package controllers

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/woojebiz/gin-web/models"
	"github.com/woojebiz/gin-web/services"
)

type LoginController interface {
	ShowLogin(ctx *gin.Context)
	Login(ctx *gin.Context)
}

type loginController struct {
	loginService services.LoginService
	jWtService   services.JWTService
}

func NewLoginController(loginService services.LoginService,
	jWtService services.JWTService) LoginController {
	return &loginController{
		loginService: loginService,
		jWtService:   jWtService,
	}
}

func (con *loginController) Login(ctx *gin.Context) {
	if token := con.getLogin(ctx); token != "" {
		// cookie 저장 방식
		ctx.SetCookie("access-token", token, 60*60*24, "/", "localhost:8080", false, true)
	} else {
		ctx.JSON(http.StatusUnauthorized, gin.H{})
	}
}

func (con *loginController) getLogin(ctx *gin.Context) string {
	var user models.User
	if err := ctx.ShouldBind(&user); err != nil {
		return ""
	}
	if isAuthenticated := con.loginService.Login(user.Username, user.Password); isAuthenticated {
		return con.jWtService.GenerateToken(user.Username, true)
	}
	return ""
}

func (con *loginController) ShowLogin(c *gin.Context) {
	Render(c, gin.H{}, "login.html")
}
