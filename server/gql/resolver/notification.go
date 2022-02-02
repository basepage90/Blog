package resolver

import (
	"github.com/graphql-go/graphql"
	"github.com/woojebiz/gin-web/server/services"
)

type NotificationResolver interface {
	GetNotificationList(params graphql.ResolveParams) (interface{}, error)
	ModifyReadingStatus(params graphql.ResolveParams) (interface{}, error)
}

type notificationResolver struct {
	service services.NotificationService
}

func NewNotificationResolver(service services.NotificationService) NotificationResolver {
	return &notificationResolver{
		service: service,
	}
}

func (rsv *notificationResolver) GetNotificationList(params graphql.ResolveParams) (interface{}, error) {
	res, err := rsv.service.GetNotificationList(params.Args)
	return res, err
}

func (rsv *notificationResolver) ModifyReadingStatus(params graphql.ResolveParams) (interface{}, error) {
	res, err := rsv.service.ModifyReadingStatus(params.Args)
	return res, err
}
