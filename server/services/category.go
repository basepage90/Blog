package services

import (
	"github.com/woojebiz/gin-web/server/models"
	"github.com/woojebiz/gin-web/server/repositories"
)

type CategoryService interface {
	FindAll(args map[string]interface{}) ([]models.Category, error)
}

type categoryService struct {
	repository repositories.CategoryRepository
}

func NewCategoryService(categoryRepository repositories.CategoryRepository) CategoryService {
	return &categoryService{
		repository: categoryRepository,
	}
}

func (service *categoryService) FindAll(args map[string]interface{}) ([]models.Category, error) {
	res, err := service.repository.FindAll()
	return res, err
}
