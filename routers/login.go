package routers

import (
	"github.com/gin-gonic/gin"
	"github.com/woojebiz/gin-web/controllers"
	"github.com/woojebiz/gin-web/repositories"
	"github.com/woojebiz/gin-web/services"
)

func InitLoginRouter(Router *gin.RouterGroup) {
	repository := repositories.NewLoginRepository()
	loginService := services.NewLoginService(repository)
	jwtService := services.NewJWTService()
	controller := controllers.NewLoginController(loginService, jwtService)

	// login and join
	Router.GET("/login", controller.ShowLogin)
	Router.POST("/getLogin", controller.Login)
	Router.POST("/signup", controller.Signup)
	Router.GET("/login/certi/:certi_key", controller.Certificate)

	// SNS Login
	Router.GET("/login/kakao", controller.LoginKakao)
	Router.POST("/getLogin/kakao", controller.GetLoginKakao)

	// logout
	Router.POST("/deleteToken", controller.DeleteToken)
}
