package services

import (
	"errors"

	"github.com/woojebiz/gin-web/server/models"
	"github.com/woojebiz/gin-web/server/repositories"
)

type ArticleService interface {
	GetArticleByID(string) (models.Article, error)
	DeleteArticleById(string) error
	FindAll() ([]models.Article, error)
}

type articleService struct {
	repository repositories.ArticleRepository
}

func NewArticleService(articleRepository repositories.ArticleRepository) ArticleService {
	return &articleService{
		repository: articleRepository,
	}
}

func (service *articleService) GetArticleByID(id string) (models.Article, error) {
	article, err := service.repository.FindById(id)
	return article, err
}

func (service *articleService) DeleteArticleById(id string) error {
	if err := service.repository.DeleteById(id); err == nil {
		return nil
	}
	return errors.New("Article not found")
}

func (service *articleService) FindAll() ([]models.Article, error) {
	articles, err := service.repository.FindAll()
	return articles, err
}
