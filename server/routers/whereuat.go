package routers

import (
	"github.com/gin-gonic/gin"
	"github.com/woojebiz/gin-web/server/controllers"
)

func InitWhereuatRouter(Router *gin.RouterGroup) {
	Router.POST("/whereuat/send_push", controllers.HandleSendPush)
}
