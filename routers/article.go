package routers

import (
	"github.com/gin-gonic/gin"
	"github.com/woojebiz/gin-web/controllers"
	"github.com/woojebiz/gin-web/repositories"
	"github.com/woojebiz/gin-web/services"
)

func InitArticleRouter(Router *gin.RouterGroup) {
	repository := repositories.NewArticleRepository()
	service := services.NewArticleService(repository)
	controller := controllers.NewArticleController(service)

	Router.GET("/article/:article_id", controller.GetArticle)
	Router.POST("/article/:article_id/delete", controller.DeleteArticle)
}
