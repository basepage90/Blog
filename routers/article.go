package routers

import (
	"github.com/gin-gonic/gin"
	ctrl "github.com/woojebiz/gin-web/controllers"
)

func InitArticleRouter(Router *gin.RouterGroup) {
	Router.GET("/article", ctrl.GetIndex)
}
