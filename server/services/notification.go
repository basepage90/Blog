package services

import (
	"strings"

	"github.com/woojebiz/gin-web/server/models"
	"github.com/woojebiz/gin-web/server/repositories"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type NotificationService interface {
	GetNotificationList(args map[string]interface{}) (interface{}, error)
	ModifyReadingStatus(args map[string]interface{}) (interface{}, error)
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
	res, err := service.repository.FindAllByReadingStatusAndOneMonth(reading_status)
	return res, err
}

func (service *notificationService) ModifyReadingStatus(args map[string]interface{}) (interface{}, error) {
	// react gql 로 전달받은 id 를 value만 남은 string 으로 변환
	stringID := strings.ReplaceAll(args["id"].(string), "ObjectID(\"", "")
	stringID = strings.ReplaceAll(stringID, "\")", "")

	// primitive.ObjectID 로 변환
	id, _ := primitive.ObjectIDFromHex(stringID)

	inputData := models.Notification{
		Id:             id,
		Reading_status: args["reading_status"].(string),
	}
	res, err := service.repository.UpdateReadingStatus(inputData)
	return res, err
}
