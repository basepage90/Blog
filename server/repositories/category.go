package repositories

import (
	"context"

	"github.com/woojebiz/gin-web/server/db"
	"github.com/woojebiz/gin-web/server/models"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

type CategoryRepository interface {
	FindAll() ([]models.Category, error)
}

type categoryRepository struct {
	db *mongo.Collection
}

func NewCategoryRepository() CategoryRepository {
	client := db.GetClient()
	db := client.Database("blog").Collection("category")

	return &categoryRepository{
		db: db,
	}
}

func (r *categoryRepository) FindAll() ([]models.Category, error) {
	var res []models.Category
	opts := options.Find().
		SetSort(bson.M{"sno": 1}).
		SetCollation(&options.Collation{
			Locale:          "en_US",
			NumericOrdering: true,
		})
	data, err := r.db.Find(context.TODO(), bson.M{}, opts)
	err = data.All(context.TODO(), &res)

	return res, err
}
