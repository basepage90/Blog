package services

import (
	"github.com/woojebiz/gin-web/server/repositories"
)

type NotificationService interface {
	GetNotificationList(args map[string]interface{}) (interface{}, error)
}

type notificationService struct {
	repository repositories.NotificationRepository
}

func NewNotificationService(repository repositories.NotificationRepository) NotificationService {
	return &notificationService{
		repository: repository,
	}
}

func (service *notificationService) GetNotificationList(args map[string]interface{}) (interface{}, error) {
	reading_status := args["reading_status"].(string)
	res, err := service.repository.FindAllByReadingStatus(reading_status)
	return res, err
}
