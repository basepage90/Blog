package services

import (
	"errors"

	"github.com/woojebiz/gin-web/models"
)

type ArticleService interface {
	GetArticleByID(string) (*models.Article, error)
	DeleteArticleById(string) error
}

type articleService struct {
	article models.Article
}

func NewArticleService() ArticleService {
	return &articleService{}
}

func (service *articleService) GetArticleByID(id string) (*models.Article, error) {
	for _, a := range models.ArticleList {
		if a.Id == id {
			return &a, nil
		}
	}
	return nil, errors.New("Article not found")
}

func (service *articleService) DeleteArticleById(id string) error {
	for i, a := range models.ArticleList {
		if a.Id == id {
			// 해당 slice의 element 를 지우고, 왼쪽으로 한칸씩 옮긴다.
			models.ArticleList = models.ArticleList[:i+copy(models.ArticleList[i:], models.ArticleList[i+1:])]
			return nil
		}
	}
	return errors.New("Article not found")
}
