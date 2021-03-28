package controllers

import (
	"github.com/gin-gonic/gin"
	"github.com/woojebiz/gin-web/models"
)

func GetIndex(c *gin.Context) {

	articles := models.GetAllArticles()

	render(c, gin.H{
		"title":   "Index Page",
		"payload": articles},
		"index.html")

	//  render function 으로 대체 (v0.0.2)
	// c.HTML(http.StatusOK, "index.html", gin.H{
	// 	"title":   "Index Page",
	// 	"payload": articles,
	// },
	// )
}

func GetTest(c *gin.Context) {
	render(c, gin.H{
		"title": "Index Page",
	},
		"test.html")
}
