package services

import (
	"github.com/woojebiz/gin-web/server/models"
	"github.com/woojebiz/gin-web/server/repositories"
)

type ArticlesService interface {
	FindById(args map[string]interface{}) (models.Articles, error)
	FindAllByCategory(args map[string]interface{}) ([]models.Articles, error)
	FindAll(args map[string]interface{}) ([]models.Articles, error)
	UpdatePrivacy(args map[string]interface{}) (interface{}, error)
	CreateArticles(args map[string]interface{}) (interface{}, error)
	EditArticles(args map[string]interface{}) (interface{}, error)
	DeleteArticles(args map[string]interface{}) (interface{}, error)
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

	var cursorId int
	var limit int
	var searchType int
	var searchWord string

	if args["cursorId"] == nil {
		cursorId = 0
	} else {
		cursorId = args["cursorId"].(int)
	}

	if args["limit"] == nil {
		limit = 10
	} else {
		limit = args["limit"].(int)
	}

	if args["searchType"] == nil {
		searchType = 0
	} else {
		searchType = args["searchType"].(int)
	}

	if args["searchWord"] == nil {
		searchWord = ""
	} else {
		searchWord = args["searchWord"].(string)
	}

	switch searchType {
	case 1:
		res, err = service.repository.FindAllBySearchWord(cursorId, limit, searchWord)
		break
	default:
		res, err = service.repository.FindAll(cursorId, limit)
		break
	}

	return res, err
}

func (service *articlesService) UpdatePrivacy(args map[string]interface{}) (interface{}, error) {
	inputData := models.Articles{
		Id:      args["id"].(int),
		Privacy: args["privacy"].(string),
	}

	res, err := service.repository.UpdatePrivacy(inputData)

	return res, err
}

func (service *articlesService) CreateArticles(args map[string]interface{}) (interface{}, error) {
	inputData := models.Articles{
		Title:       args["title"].(string),
		Hashtag:     args["hashtag"].(string),
		Desc:        args["desc"].(string),
		Contents:    args["contents"].(string),
		Category_lg: args["category_lg"].(string),
		Category_md: args["category_md"].(string),
		Thumbnail:   args["thumbnail"].(string),
		Privacy:     args["privacy"].(string),
	}
	res, err := service.repository.InsertArticles(inputData)
	return res, err
}

func (service *articlesService) EditArticles(args map[string]interface{}) (interface{}, error) {
	inputData := models.Articles{
		Id:          args["id"].(int),
		Title:       args["title"].(string),
		Hashtag:     args["hashtag"].(string),
		Desc:        args["desc"].(string),
		Contents:    args["contents"].(string),
		Category_lg: args["category_lg"].(string),
		Category_md: args["category_md"].(string),
		Thumbnail:   args["thumbnail"].(string),
		Privacy:     args["privacy"].(string),
	}
	res, err := service.repository.UpdateArticles(inputData)
	return res, err
}

func (service *articlesService) DeleteArticles(args map[string]interface{}) (interface{}, error) {
	id := args["id"].(int)
	res, err := service.repository.DeleteArticlesById(id)
	return res, err
}
