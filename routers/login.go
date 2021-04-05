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

	Router.GET("/login", controller.ShowLogin)
	Router.POST("/getLogin", controller.Login)
	Router.POST("/signup", controller.Signup)
}
