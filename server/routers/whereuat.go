package routers

import (
	"github.com/gin-gonic/gin"
	"github.com/woojebiz/gin-web/server/controllers"
)

func InitWhereuatRouter(Router *gin.RouterGroup) {
	Router.POST("/whereuat/send_push", controllers.HandleSendPush)
	Router.POST("/whereuat-google/send_push", controllers.HandleSendPushGoogle)
}
