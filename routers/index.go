package routers

import (
	"github.com/gin-gonic/gin"
	ctrl "github.com/woojebiz/gin-web/controllers"
)

func InitIndexRouter(Router *gin.RouterGroup) {
	Router.GET("/", ctrl.GetIndex)
	Router.GET("/test", ctrl.GetTest)
}
