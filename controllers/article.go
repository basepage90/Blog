package controllers

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/woojebiz/gin-web/services"
)

type ArticleController interface {
	GetArticle(*gin.Context)
	DeleteArticle(*gin.Context)
}

type articleController struct {
	service services.ArticleService
}

func NewArticleController(service services.ArticleService) ArticleController {
	return &articleController{
		service: service,
	}
}

func (con *articleController) GetArticle(ctx *gin.Context) {
	// Check if the article_id is valid
	articleID := ctx.Param("article_id")

	// Check if the article exists
	if article, err := con.service.GetArticleByID(articleID); err == nil {
		render(ctx,
			gin.H{
				"title":   article.Title,
				"payload": article,
			},
			"article.html",
		)
	} else {
		// If the article is not found, abort with an error
		ctx.AbortWithError(http.StatusNotFound, err)
	}

}
func (con *articleController) DeleteArticle(ctx *gin.Context) {

	// Check if the article_id is valid
	articleID := ctx.Param("article_id")

	// Check if the article exists
	if err := con.service.DeleteArticleById(articleID); err == nil {

	} else {
		// If the article is not found, abort with an error
		ctx.AbortWithError(http.StatusNotFound, err)
	}
}
