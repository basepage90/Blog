package repositories

import (
	"context"

	"github.com/woojebiz/gin-web/server/db"
	"github.com/woojebiz/gin-web/server/models"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
)

type SigninRepository interface {
	FindByEmail(email string) (models.User, error)
	FindByUUID(certi_key string) (models.User, error)
	UpdateUUID(user models.User) (interface{}, error)
}

type signinRepository struct {
	db *mongo.Collection
}

func NewSigninRepository() SigninRepository {
	client := db.GetClient()
	db := client.Database("admin").Collection("user")
	return &signinRepository{
		db: db,
	}
}

func (r *signinRepository) FindByEmail(email string) (models.User, error) {
	var res models.User
	err := r.db.FindOne(context.TODO(), bson.M{"email": email}).Decode(&res)
	return res, err
}
func (r *signinRepository) FindByUUID(certi_key string) (models.User, error) {
	var res models.User
	err := r.db.FindOne(context.TODO(), bson.M{"uuid": certi_key}).Decode(&res)
	return res, err
}

func (r *signinRepository) UpdateUUID(user models.User) (interface{}, error) {
	result, err := r.db.UpdateOne(context.TODO(), bson.M{"email": user.Email}, bson.M{"$set": bson.M{"uuid": user.Uuid}})
	return result.ModifiedCount, err
}
