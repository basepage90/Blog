package controllers

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/woojebiz/gin-web/models"
)

func GetIndex(c *gin.Context) {

	articles := models.GetAllArticles()

	c.HTML(http.StatusOK, "index.html", gin.H{
		"title":   "Index Page",
		"payload": articles,
	},
	)

}
