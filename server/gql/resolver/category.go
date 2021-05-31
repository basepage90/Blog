package resolver

import (
	"github.com/graphql-go/graphql"
	"github.com/woojebiz/gin-web/server/services"
)

type CategoryResolver interface {
	GetCategoryAll(params graphql.ResolveParams) (interface{}, error)
}

type categoryResolver struct {
	service services.CategoryService
}

func NewCategoryResolver(service services.CategoryService) CategoryResolver {
	return &categoryResolver{
		service: service,
	}
}

func (rsv *categoryResolver) GetCategoryAll(params graphql.ResolveParams) (interface{}, error) {
	res, err := rsv.service.FindAll(params.Args)
	return res, err
}
