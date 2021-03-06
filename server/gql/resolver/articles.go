package resolver

import (
	"github.com/graphql-go/graphql"
	"github.com/woojebiz/gin-web/server/middleware"
	"github.com/woojebiz/gin-web/server/services"
)

type ArticlesResolver interface {
	GetArticlesById(params graphql.ResolveParams) (interface{}, error)
	GetArticlesByCategory(params graphql.ResolveParams) (interface{}, error)
	GetArticlesAll(params graphql.ResolveParams) (interface{}, error)
	UpdatePrivacy(params graphql.ResolveParams) (interface{}, error)
	CreateArticles(params graphql.ResolveParams) (interface{}, error)
	EditArticles(params graphql.ResolveParams) (interface{}, error)
	DeleteArticles(params graphql.ResolveParams) (interface{}, error)
}

type articlesResolver struct {
	service services.ArticlesService
}

func NewArticlesResolver(service services.ArticlesService) ArticlesResolver {
	return &articlesResolver{
		service: service,
	}
}

func (rsv *articlesResolver) GetArticlesById(params graphql.ResolveParams) (interface{}, error) {
	res, err := rsv.service.FindById(params.Args)
	return res, err
}

func (rsv *articlesResolver) GetArticlesByCategory(params graphql.ResolveParams) (interface{}, error) {
	res, err := rsv.service.FindAllByCategory(params.Args)
	return res, err
}

func (rsv *articlesResolver) GetArticlesAll(params graphql.ResolveParams) (interface{}, error) {
	res, err := rsv.service.FindAll(params.Args)
	return res, err
}

func (rsv *articlesResolver) UpdatePrivacy(params graphql.ResolveParams) (interface{}, error) {
	CA := middleware.GetCookieAccess(params.Context)
	if CA.IsSignedIn == true {
		res, err := rsv.service.UpdatePrivacy(params.Args)
		return res, err
	} else {
		return nil, nil
	}

}

func (rsv *articlesResolver) CreateArticles(params graphql.ResolveParams) (interface{}, error) {
	CA := middleware.GetCookieAccess(params.Context)
	if CA.IsSignedIn == true {
		res, err := rsv.service.CreateArticles(params.Args)
		return res, err
	} else {
		return nil, nil
	}
}

func (rsv *articlesResolver) EditArticles(params graphql.ResolveParams) (interface{}, error) {
	CA := middleware.GetCookieAccess(params.Context)
	if CA.IsSignedIn == true {
		res, err := rsv.service.EditArticles(params.Args)
		return res, err
	} else {
		return nil, nil
	}

}

func (rsv *articlesResolver) DeleteArticles(params graphql.ResolveParams) (interface{}, error) {
	CA := middleware.GetCookieAccess(params.Context)
	if CA.IsSignedIn == true {
		res, err := rsv.service.DeleteArticles(params.Args)
		return res, err
	} else {
		return nil, nil
	}
}
