package controllers

import (
	"github.com/gin-gonic/gin"
	"github.com/woojebiz/gin-web/server/repositories"
)

var ar = repositories.NewArticleRepository()

func GetIndex(c *gin.Context) {
	if articles, err := ar.FindAll(); err == nil {
		Render(c, gin.H{
			"title":   "Index Page",
			"payload": articles},
			"index.html")
	}
}

func GetTest(c *gin.Context) {
	Render(c, gin.H{
		"title": "Index Page",
	},
		"test.html")
}