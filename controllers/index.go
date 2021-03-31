package controllers

import (
	"github.com/gin-gonic/gin"
	"github.com/woojebiz/gin-web/repositories"
)

var ar = repositories.NewArticleRepository()

func GetIndex(c *gin.Context) {
	if articles, err := ar.FindAll(); err == nil {
		render(c, gin.H{
			"title":   "Index Page",
			"payload": articles},
			"index.html")
	}
}

func GetTest(c *gin.Context) {
	render(c, gin.H{
		"title": "Index Page",
	},
		"test.html")
}
