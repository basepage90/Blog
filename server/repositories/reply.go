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

type ReplyRepository interface {
	InsertReply(inputData models.Reply) (interface{}, error)
	FindByArticleId(article_id int) ([]models.Reply, error)
	FindById(id primitive.ObjectID) (models.Reply, error)
	CountByGroupNo(group_no int) (int, error)
	BlindReply(id primitive.ObjectID, password string) (interface{}, error)
	DeleteReply(id primitive.ObjectID, password string) (interface{}, error)
}

type replyRepository struct {
	db    *mongo.Collection
	seqdb *mongo.Collection
}

func NewReplyRepository() ReplyRepository {
	client := db.GetClient()
	db := client.Database("blog").Collection("reply")
	seqdb := client.Database("blog").Collection("sequence")
	return &replyRepository{
		db:    db,
		seqdb: seqdb,
	}
}

func (r *replyRepository) InsertReply(inputData models.Reply) (interface{}, error) {
	loc, _ := time.LoadLocation("Asia/Seoul")
	reg_date := time.Now().In(loc).Format("2006-01-02 15:04:05")
	insertData := bson.M{}

	if inputData.Depth == 0 {
		// Depth가 0이면, group_no를 sequence로 새로 생성한다.
		insertData = bson.M{
			"article_id":   inputData.Article_id,
			"depth":        inputData.Depth,
			"group_no":     r.getNextSequence("seq_reply"),
			"sibling_name": inputData.Sibling_name,
			"name":         inputData.Name,
			"password":     inputData.Password,
			// "secret":       inputData.Secret,
			"contents":   inputData.Contents,
			"reg_date":   reg_date,
			"admin_flag": inputData.Admin_flag,
		}

	} else {
		// Depth가 0 이아니면, Depth 0의 group_no를 사용한다.
		insertData = bson.M{
			"article_id":   inputData.Article_id,
			"depth":        inputData.Depth,
			"group_no":     inputData.Group_no,
			"sibling_name": inputData.Sibling_name,
			"name":         inputData.Name,
			"password":     inputData.Password,
			// "secret":       inputData.Secret,
			"contents":   inputData.Contents,
			"reg_date":   reg_date,
			"admin_flag": inputData.Admin_flag,
		}
	}

	result, err := r.db.InsertOne(context.TODO(), insertData)

	id := result.InsertedID.(primitive.ObjectID)
	res := models.Reply{
		Id: id,
	}
	return res, err
}

func (r *replyRepository) FindByArticleId(article_id int) ([]models.Reply, error) {
	var res []models.Reply

	opts := options.Find().
		SetSort(bson.M{"group_no": 1}).
		SetCollation(&options.Collation{
			Locale:          "en_US",
			NumericOrdering: true,
		})
	data, err := r.db.Find(context.TODO(), bson.M{"article_id": article_id}, opts)
	err = data.All(context.TODO(), &res)
	return res, err
}

func (r *replyRepository) FindById(id primitive.ObjectID) (models.Reply, error) {
	var res models.Reply
	err := r.db.FindOne(context.TODO(), bson.D{{Key: "_id", Value: id}}).Decode(&res)
	return res, err
}

func (r *replyRepository) CountByGroupNo(group_no int) (int, error) {
	res, err := r.db.CountDocuments(context.TODO(), bson.M{"group_no": group_no})
	return int(res), err
}

func (r *replyRepository) BlindReply(id primitive.ObjectID, password string) (interface{}, error) {
	result, err := r.db.UpdateOne(context.TODO(),
		bson.M{"_id": id, "password": password},
		bson.M{"$set": bson.M{
			"blind": true,
		}},
	)
	return result.ModifiedCount, err
}

func (r *replyRepository) DeleteReply(id primitive.ObjectID, password string) (interface{}, error) {
	result, err := r.db.DeleteOne(context.TODO(), bson.M{"_id": id, "password": password})
	return result.DeletedCount, err
}

func (r *replyRepository) getNextSequence(seqid string) int {
	var res models.Sequence
	r.seqdb.FindOneAndUpdate(context.TODO(),
		bson.M{"_id": seqid},
		bson.M{"$inc": bson.M{"seq": 1}},
		options.FindOneAndUpdate().SetReturnDocument(1),
	).Decode(&res)
	return res.Seq
}
