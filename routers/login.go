package routers

import (
	"github.com/gin-gonic/gin"
	"github.com/woojebiz/gin-web/controllers"
	"github.com/woojebiz/gin-web/services"
)

func InitLoginRouter(Router *gin.RouterGroup) {
	loginService := services.NewLoginService()
	jwtService := services.NewJWTService()
	controller := controllers.NewLoginController(loginService, jwtService)

	Router.GET("/login", controller.ShowLogin)
	Router.POST("/getLogin", controller.Login)
}
