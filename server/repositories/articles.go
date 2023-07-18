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
	InsertArticles(inputData models.Articles) (interface{}, error)
	FindById(id int) (models.Articles, error)
	FindAllByCategorylg(category_lg string) ([]models.Articles, error)
	FindAllByCategorymd(category_lg, caategory_md string) ([]models.Articles, error)
	FindAllBySearchWord(cursorId, limit int, searchWord string) ([]models.Articles, error)
	FindAll(cursorId, limit int) ([]models.Articles, error)
	UpdatePrivacy(inputData models.Articles) (interface{}, error)
	UpdateArticles(inputData models.Articles) (interface{}, error)
	DeleteArticlesById(id int) (interface{}, error)
	getNextSequence(seqid string) int
}

type articlesRepository struct {
	db    *mongo.Collection
	seqdb *mongo.Collection
}

func NewArticlesRepository() ArticlesRepository {
	client := db.GetClient()
	db := client.Database("blog").Collection("articles")
	seqdb := client.Database("blog").Collection("sequence")
	return &articlesRepository{
		db:    db,
		seqdb: seqdb,
	}
}

func (r *articlesRepository) InsertArticles(inputData models.Articles) (interface{}, error) {
	loc, _ := time.LoadLocation("Asia/Seoul")
	reg_date := time.Now().In(loc).Format("2006-01-02 15:04:05")

	result, err := r.db.InsertOne(context.TODO(), bson.M{
		"_id":         r.getNextSequence("seq_article"),
		"title":       inputData.Title,
		"hashtag":     inputData.Hashtag,
		"reg_date":    reg_date,
		"updt_date":   "",
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

func (r *articlesRepository) FindAllBySearchWord(cursorId, limit int, searchWord string) ([]models.Articles, error) {
	var res []models.Articles
	var data *mongo.Cursor
	var err error

	opts := options.Find().
		SetSort(bson.M{"_id": -1}).
		SetLimit(int64(limit)).
		SetCollation(&options.Collation{
			Locale:          "en_US",
			NumericOrdering: true,
		})

	if cursorId == 0 {
		// first fetch
		data, err = r.db.Find(context.TODO(), bson.M{
			"$or": []bson.M{
				{"title": bson.M{"$regex": searchWord, "$options": "i"}},
				{"desc": bson.M{"$regex": searchWord, "$options": "i"}},
				{"contents": bson.M{"$regex": searchWord, "$options": "i"}},
				{"hashtag": bson.M{"$regex": searchWord, "$options": "i"}},
			},
		}, opts)
	} else {
		// fetchMore : cursor pagination
		data, err = r.db.Find(context.TODO(), bson.M{
			"_id": bson.M{"$lt": cursorId},
			"$or": []bson.M{
				{"title": bson.M{"$regex": searchWord, "$options": "i"}},
				{"desc": bson.M{"$regex": searchWord, "$options": "i"}},
				{"contents": bson.M{"$regex": searchWord, "$options": "i"}},
				{"hashtag": bson.M{"$regex": searchWord, "$options": "i"}},
			},
		}, opts)
	}

	err = data.All(context.TODO(), &res)
	return res, err
}

func (r *articlesRepository) FindAll(cursorId, limit int) ([]models.Articles, error) {
	var res []models.Articles
	var data *mongo.Cursor
	var err error

	opts := options.Find().
		SetSort(bson.M{"_id": -1}).
		SetLimit(int64(limit)).
		SetCollation(&options.Collation{
			Locale:          "en_US",
			NumericOrdering: true,
		})

	if cursorId == 0 {
		// first fetch
		data, err = r.db.Find(context.TODO(), bson.M{
			"category_md": bson.M{"$ne": "diary"},
		}, opts)
	} else {
		// fetchMore : cursor pagination
		data, err = r.db.Find(context.TODO(), bson.M{
			"_id":         bson.M{"$lt": cursorId},
			"category_md": bson.M{"$ne": "diary"},
		}, opts)
	}

	err = data.All(context.TODO(), &res)
	return res, err
}

func (r *articlesRepository) UpdatePrivacy(inputData models.Articles) (interface{}, error) {
	result, err := r.db.UpdateOne(context.TODO(), bson.M{"_id": inputData.Id}, bson.M{"$set": bson.M{"privacy": inputData.Privacy}})
	return result.ModifiedCount, err
}

func (r *articlesRepository) UpdateArticles(inputData models.Articles) (interface{}, error) {
	var data bson.M
	updt_date := time.Now().Format("2006-01-02")

	if inputData.Thumbnail == "unchanged" {
		// 썸네일이 "unchanged"이면 썸네일은 업데이트 하지 않는다.
		data = bson.M{
			"_id":         inputData.Id,
			"title":       inputData.Title,
			"hashtag":     inputData.Hashtag,
			"updt_date":   updt_date,
			"desc":        inputData.Desc,
			"contents":    inputData.Contents,
			"category_lg": inputData.Category_lg,
			"category_md": inputData.Category_md,
			"privacy":     inputData.Privacy,
		}
	} else {
		data = bson.M{
			"_id":         inputData.Id,
			"title":       inputData.Title,
			"hashtag":     inputData.Hashtag,
			"updt_date":   updt_date,
			"desc":        inputData.Desc,
			"contents":    inputData.Contents,
			"category_lg": inputData.Category_lg,
			"category_md": inputData.Category_md,
			"thumbnail":   inputData.Thumbnail,
			"privacy":     inputData.Privacy,
		}
	}

	result, err := r.db.UpdateOne(context.TODO(),
		bson.M{"_id": inputData.Id},
		bson.M{"$set": data},
	)

	return result.ModifiedCount, err
}

func (r *articlesRepository) DeleteArticlesById(id int) (interface{}, error) {
	result, err := r.db.DeleteOne(context.TODO(), bson.M{"_id": id})
	return result.DeletedCount, err
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
