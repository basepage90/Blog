package repositories

import (
	"context"
	"time"

	"github.com/woojebiz/gin-web/server/db"
	"github.com/woojebiz/gin-web/server/models"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

type NotificationRepository interface {
	FindAllByReadingStatusAndOneMonth(reading_status string) (interface{}, error)
	InsertNotification(inputData models.Reply) (interface{}, error)
	UpdateReadingStatus(inputData models.Notification) (interface{}, error)
}

type notificationRepository struct {
	db *mongo.Collection
}

func NewNotificationRepository() NotificationRepository {
	client := db.GetClient()
	db := client.Database("admin").Collection("notification")
	return &notificationRepository{
		db: db,
	}
}

func (r *notificationRepository) FindAllByReadingStatusAndOneMonth(reading_status string) (interface{}, error) {
	var res []models.Notification
	now := time.Now()
	currentDate := now.Format("2006-01-02 15:04:05")
	AMonthAgo := now.AddDate(0, -1, 0).Format("2006-01-02 15:04:05")

	filter := bson.M{
		"reg_date": bson.M{"$lte": currentDate, "$gte": AMonthAgo},
	}

	if reading_status != "" {
		filter = bson.M{
			"reading_status": reading_status,
			"reg_date":       bson.M{"$lte": currentDate, "$gte": AMonthAgo},
		}
	}

	opts := options.Find().
		SetSort(bson.M{"reg_date": -1}).
		SetCollation(&options.Collation{
			Locale:          "en_US",
			NumericOrdering: true,
		})
	data, err := r.db.Find(context.TODO(), filter, opts)
	err = data.All(context.TODO(), &res)
	return res, err
}

func (r *notificationRepository) InsertNotification(inputData models.Reply) (interface{}, error) {
	reg_date := time.Now().Format("2006-01-02 15:04:05")
	insertData := bson.M{
		"article_id":     inputData.Article_id,
		"name":           inputData.Name,
		"contents":       inputData.Contents,
		"reg_date":       reg_date,
		"reading_status": "UNREAD",
	}

	result, err := r.db.InsertOne(context.TODO(), insertData)

	id := result.InsertedID.(primitive.ObjectID)
	res := models.Notification{
		Id: id,
	}
	return res, err
}

func (r *notificationRepository) UpdateReadingStatus(inputData models.Notification) (interface{}, error) {
	result, err := r.db.UpdateOne(
		context.TODO(),
		bson.M{"_id": inputData.Id},
		bson.M{"$set": bson.M{"reading_status": inputData.Reading_status}},
	)
	return result.ModifiedCount, err
}
