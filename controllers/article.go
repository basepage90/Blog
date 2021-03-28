package controllers

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/woojebiz/gin-web/services"
)

func GetArticle(c *gin.Context) {
	// Check if the article_id is valid
	articleID := c.Param("article_id")

	// Check if the article exists
	if article, err := services.GetArticleByID(articleID); err == nil {
		render(c,
			gin.H{
				"title":   article.Title,
				"payload": article,
			},
			"article.html",
		)
	} else {
		// If the article is not found, abort with an error
		c.AbortWithError(http.StatusNotFound, err)
	}

}
