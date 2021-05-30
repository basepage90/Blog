package controllers

import (
	"github.com/gin-gonic/gin"
	"github.com/woojebiz/gin-web/server/services"
)

type ArticlesController interface {
	GetArticles(*gin.Context)
}

type articlesController struct {
	service services.ArticlesService
}

func NewArticlesController(service services.ArticlesService) ArticlesController {
	return &articlesController{
		service: service,
	}
}

func (con *articlesController) GetArticles(ctx *gin.Context) {
	// res, _ := con.service.FindAll()

	// fmt.Println(res)

}
