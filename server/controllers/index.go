package controllers

import (
	"github.com/gin-gonic/gin"
	"github.com/woojebiz/gin-web/server/repositories"
)

func GetIndex(c *gin.Context) {
	var ar = repositories.NewArticleRepository()
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
