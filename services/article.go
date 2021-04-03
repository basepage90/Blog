package services

import (
	"errors"

	"github.com/woojebiz/gin-web/models"
	"github.com/woojebiz/gin-web/repositories"
)

type ArticleService interface {
	GetArticleByID(string) (*models.Article, error)
	DeleteArticleById(string) error
	FindAll() (*[]models.Article, error)
}

type articleService struct {
	repository repositories.ArticleRepository
}

func NewArticleService(articleRepository repositories.ArticleRepository) ArticleService {
	return &articleService{
		repository: articleRepository,
	}
}

func (service *articleService) GetArticleByID(id string) (*models.Article, error) {
	if article, err := service.repository.FindById(id); err == nil {
		return &article, err
	}
	return nil, errors.New("Article not found")
}

func (service *articleService) DeleteArticleById(id string) error {
	if err := service.repository.DeleteById(id); err == nil {
		return nil
	}
	return errors.New("Article not found")
}

func (service *articleService) FindAll() (*[]models.Article, error) {
	if articles, err := service.repository.FindAll(); err == nil {
		return &articles, err
	}
	return nil, errors.New("test")
}
