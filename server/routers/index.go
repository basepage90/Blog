package routers

import (
	"github.com/gin-gonic/gin"
	ctrl "github.com/woojebiz/gin-web/server/controllers"
)

func InitIndexRouter(Router *gin.RouterGroup) {
	Router.GET("/", ctrl.GetIndex)
}
