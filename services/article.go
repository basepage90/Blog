package services

import (
	"errors"

	"github.com/woojebiz/gin-web/models"
)

func GetArticleByID(id string) (*models.Article, error) {
	for _, a := range models.ArticleList {
		if a.Id == id {
			return &a, nil
		}
	}
	return nil, errors.New("Article not found")
}
