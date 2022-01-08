package resolver

import (
	"github.com/graphql-go/graphql"
	"github.com/woojebiz/gin-web/server/middleware"
	"github.com/woojebiz/gin-web/server/services"
)

type ReplyResolver interface {
	CreateReply(params graphql.ResolveParams) (interface{}, error)
	GetReplyByArticleId(params graphql.ResolveParams) (interface{}, error)
	RemoveReply(params graphql.ResolveParams) (interface{}, error)
}

type replyResolver struct {
	service services.ReplyService
}

func NewReplyResolver(service services.ReplyService) ReplyResolver {
	return &replyResolver{
		service: service,
	}
}

func (rsv *replyResolver) CreateReply(params graphql.ResolveParams) (interface{}, error) {
	res, err := rsv.service.CreateReply(params.Args)
	return res, err
}

func (rsv *replyResolver) GetReplyByArticleId(params graphql.ResolveParams) (interface{}, error) {
	res, err := rsv.service.FindByArticleId(params.Args)
	return res, err
}

func (rsv *replyResolver) RemoveReply(params graphql.ResolveParams) (interface{}, error) {
	CA := middleware.GetCookieAccess(params.Context)
	signFlag := CA.IsSignedIn
	res, err := rsv.service.RemoveReply(params.Args, signFlag)
	return res, err
}
