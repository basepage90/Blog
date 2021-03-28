package routers

import (
	"github.com/gin-gonic/gin"
	"github.com/woojebiz/gin-web/controllers"
)

func InitArticleRouter(Router *gin.RouterGroup) {
	Router.GET("/article/:article_id", controllers.GetArticle)
}
