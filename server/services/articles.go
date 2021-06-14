package services

import (
	"github.com/woojebiz/gin-web/server/models"
	"github.com/woojebiz/gin-web/server/repositories"
)

type ArticlesService interface {
	FindById(args map[string]interface{}) (models.Articles, error)
	FindAllByCategory(args map[string]interface{}) ([]models.Articles, error)
	FindAll(args map[string]interface{}) ([]models.Articles, error)
	CreateArticles(args map[string]interface{}) (interface{}, error)
}

type articlesService struct {
	repository repositories.ArticlesRepository
}

func NewArticlesService(articlesRepository repositories.ArticlesRepository) ArticlesService {
	return &articlesService{
		repository: articlesRepository,
	}
}

func (service *articlesService) FindById(args map[string]interface{}) (models.Articles, error) {
	id, _ := args["id"].(int)
	res, err := service.repository.FindById(id)
	return res, err
}

func (service *articlesService) FindAllByCategory(args map[string]interface{}) ([]models.Articles, error) {
	category_lg, _ := args["category_lg"].(string)
	category_md, _ := args["category_md"].(string)

	var res []models.Articles
	var err error

	switch category_md {
	case "":
		res, err = service.repository.FindAllByCategorylg(category_lg)
		break
	default:
		res, err = service.repository.FindAllByCategorymd(category_lg, category_md)
		break
	}

	return res, err
}
func (service *articlesService) FindAll(args map[string]interface{}) ([]models.Articles, error) {
	var res []models.Articles
	var err error

	if len(args) == 0 {
		res, err = service.repository.FindAll()
	} else {
		for key, element := range args {
			ele := element.(string)
			switch key {
			case "title":
				res, err = service.repository.FindAllByTitle(ele)
				break
			// case "subtitle":
			// 	res, err = service.repository.FindAllBySubtitle(ele)
			// 	break
			// case "contents":
			// 	res, err = service.repository.FindAllByContents(ele)
			// 	break
			default:
				break
			}
		}
	}

	return res, err
}

func (service *articlesService) CreateArticles(args map[string]interface{}) (interface{}, error) {
	// var res models.Articles
	inputData := models.Articles{
		Title:       args["title"].(string),
		Subtitle:    args["subtitle"].(string),
		Desc:        args["desc"].(string),
		Contents:    args["contents"].(string),
		Category_lg: args["category_lg"].(string),
		Category_md: args["category_md"].(string),
		Thumbnail:   args["thumbnail"].(string),
		Privacy:     args["privacy"].(string),
	}

	res, err := service.repository.InsertArticles(inputData)
	// if err == nil {
	// 	res, err = service.repository.FindById(id)
	// }

	return res, err
}
