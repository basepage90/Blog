package routers

import (
	"github.com/gin-gonic/gin"
	"github.com/woojebiz/gin-web/controllers"
	"github.com/woojebiz/gin-web/repositories"
	"github.com/woojebiz/gin-web/services"
)

var (
	repository repositories.ArticleRepository = repositories.NewArticleRepository()
	service    services.ArticleService        = services.NewArticleService(repository)
	controller controllers.ArticleController  = controllers.NewArticleController(service)
)

func InitArticleRouter(Router *gin.RouterGroup) {
	Router.GET("/article/:article_id", controller.GetArticle)
	Router.POST("/article/:article_id/delete", controller.DeleteArticle)
}
