package repositories

import (
	"context"

	"github.com/woojebiz/gin-web/server/db"
	"github.com/woojebiz/gin-web/server/models"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
)

type ArticlesRepository interface {
	FindById(id string) (models.Articles, error)
	FindAllByCategorylg(category_lg string) ([]models.Articles, error)
	FindAllByCategorymd(category_lg, caategory_md string) ([]models.Articles, error)
	FindAllByTitle(title string) ([]models.Articles, error)
	FindAll() ([]models.Articles, error)
	InsertArticles(id, title string) error
}

type articlesRepository struct {
	db *mongo.Collection
}

func NewArticlesRepository() ArticlesRepository {
	client := db.GetClient()
	db := client.Database("admin").Collection("articles")

	return &articlesRepository{
		db: db,
	}
}

func (r *articlesRepository) FindById(p string) (models.Articles, error) {
	var res models.Articles
	err := r.db.FindOne(context.TODO(), bson.D{{Key: "id", Value: p}}).Decode(&res)
	return res, err
}

func (r *articlesRepository) FindAllByCategorylg(category_lg string) ([]models.Articles, error) {
	var res []models.Articles
	data, err := r.db.Find(context.TODO(), bson.M{"category_lg": category_lg})
	err = data.All(context.TODO(), &res)
	return res, err
}

func (r *articlesRepository) FindAllByCategorymd(category_lg, category_md string) ([]models.Articles, error) {
	var res []models.Articles
	data, err := r.db.Find(context.TODO(), bson.M{"category_lg": category_lg, "category_md": category_md})
	err = data.All(context.TODO(), &res)
	return res, err
}

func (r *articlesRepository) FindAllByTitle(title string) ([]models.Articles, error) {
	var res []models.Articles
	data, err := r.db.Find(context.TODO(), bson.M{"title": bson.M{"$regex": title, "$options": "i"}})
	err = data.All(context.TODO(), &res)
	return res, err
}

func (r *articlesRepository) FindAll() ([]models.Articles, error) {
	var res []models.Articles
	data, err := r.db.Find(context.TODO(), bson.D{{}})
	err = data.All(context.TODO(), &res)
	return res, err
}

func (r *articlesRepository) InsertArticles(id, title string) error {
	_, err := r.db.InsertOne(context.TODO(), bson.M{"id": id, "title": title})
	return err
}