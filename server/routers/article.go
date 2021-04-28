package routers

import (
	"github.com/gin-gonic/gin"
	"github.com/woojebiz/gin-web/server/controllers"
	"github.com/woojebiz/gin-web/server/repositories"
	"github.com/woojebiz/gin-web/server/services"
)

func InitArticleRouter(Router *gin.RouterGroup) {
	repository := repositories.NewArticleRepository()
	service := services.NewArticleService(repository)
	controller := controllers.NewArticleController(service)

	Router.GET("/article/:article_id", controller.GetArticle)
	Router.POST("/article/:article_id/delete", controller.DeleteArticle)
}
