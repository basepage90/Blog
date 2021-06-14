package repositories

import (
	"context"
	"time"

	"github.com/woojebiz/gin-web/server/db"
	"github.com/woojebiz/gin-web/server/models"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

type ArticlesRepository interface {
	FindById(id int) (models.Articles, error)
	FindAllByCategorylg(category_lg string) ([]models.Articles, error)
	FindAllByCategorymd(category_lg, caategory_md string) ([]models.Articles, error)
	FindAllByTitle(title string) ([]models.Articles, error)
	FindAll() ([]models.Articles, error)
	InsertArticles(inputData models.Articles) (interface{}, error)
	getNextSequence(seqid string) int
}

type articlesRepository struct {
	db    *mongo.Collection
	seqdb *mongo.Collection
}

func NewArticlesRepository() ArticlesRepository {
	client := db.GetClient()
	db := client.Database("admin").Collection("articles")
	seqdb := client.Database("admin").Collection("sequence")
	return &articlesRepository{
		db:    db,
		seqdb: seqdb,
	}
}

func (r *articlesRepository) FindById(id int) (models.Articles, error) {
	var res models.Articles
	err := r.db.FindOne(context.TODO(), bson.D{{Key: "_id", Value: id}}).Decode(&res)
	return res, err
}

func (r *articlesRepository) FindAllByCategorylg(category_lg string) ([]models.Articles, error) {
	var res []models.Articles
	opts := options.Find().
		SetSort(bson.M{"_id": -1}).
		SetCollation(&options.Collation{
			Locale:          "en_US",
			NumericOrdering: true,
		})
	data, err := r.db.Find(context.TODO(), bson.M{"category_lg": category_lg}, opts)
	err = data.All(context.TODO(), &res)
	return res, err
}

func (r *articlesRepository) FindAllByCategorymd(category_lg, category_md string) ([]models.Articles, error) {
	var res []models.Articles
	opts := options.Find().
		SetSort(bson.M{"_id": -1}).
		SetCollation(&options.Collation{
			Locale:          "en_US",
			NumericOrdering: true,
		})
	data, err := r.db.Find(context.TODO(), bson.M{"category_lg": category_lg, "category_md": category_md}, opts)
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
	opts := options.Find().
		SetSort(bson.M{"_id": -1}).
		SetCollation(&options.Collation{
			Locale:          "en_US",
			NumericOrdering: true,
		})
	data, err := r.db.Find(context.TODO(), bson.D{{}}, opts)
	err = data.All(context.TODO(), &res)
	return res, err
}

func (r *articlesRepository) InsertArticles(inputData models.Articles) (interface{}, error) {
	reg_date := time.Now().Format("2006-01-02")

	result, err := r.db.InsertOne(context.TODO(), bson.M{
		"_id":         r.getNextSequence("seq_article"),
		"title":       inputData.Title,
		"subtitle":    inputData.Subtitle,
		"reg_date":    reg_date,
		"desc":        inputData.Desc,
		"contents":    inputData.Contents,
		"category_lg": inputData.Category_lg,
		"category_md": inputData.Category_md,
		"thumbnail":   inputData.Thumbnail,
		"privacy":     inputData.Privacy,
	})

	id := int(result.InsertedID.(int32))
	res := models.Articles{
		Id: id,
	}
	return res, err
}

func (r *articlesRepository) getNextSequence(seqid string) int {
	var res models.Sequence
	r.seqdb.FindOneAndUpdate(context.TODO(),
		bson.M{"_id": seqid},
		bson.M{"$inc": bson.M{"seq": 1}},
		options.FindOneAndUpdate().SetReturnDocument(1),
	).Decode(&res)
	return res.Seq
}
