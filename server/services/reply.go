package services

import (
	"strings"

	"github.com/woojebiz/gin-web/server/models"
	"github.com/woojebiz/gin-web/server/repositories"
	"github.com/woojebiz/gin-web/server/utils"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type ReplyService interface {
	CreateReply(args map[string]interface{}) (interface{}, error)
	FindByArticleId(args map[string]interface{}) ([]models.Reply, error)
	RemoveReply(args map[string]interface{}, signFlag bool) (interface{}, error)
}

type replyService struct {
	repository repositories.ReplyRepository
}

func NewReplyService(replyRepository repositories.ReplyRepository) ReplyService {
	return &replyService{
		repository: replyRepository,
	}
}

func (service *replyService) CreateReply(args map[string]interface{}) (interface{}, error) {
	password := args["password"].(string)
	passwordEnc := utils.Encrypt(password)
	inputData := models.Reply{
		Article_id:   args["article_id"].(int),
		Depth:        args["depth"].(int),
		Group_no:     args["group_no"].(int),
		Sibling_name: args["sibling_name"].(string),
		Name:         args["name"].(string),
		Password:     passwordEnc,
		// Secret:       args["secret"].(bool),
		Contents:   args["contents"].(string),
		Admin_flag: args["admin_flag"].(bool),
	}
	res, err := service.repository.InsertReply(inputData)
	return res, err
}

func (service *replyService) FindByArticleId(args map[string]interface{}) ([]models.Reply, error) {
	article_id, _ := args["article_id"].(int)
	res, err := service.repository.FindByArticleId(article_id)
	return res, err
}

func (service *replyService) RemoveReply(args map[string]interface{}, signFlag bool) (interface{}, error) {
	var res interface{}
	var err error

	// react gql 로 전달받은 id 를 value만 남은 string 으로 변환
	stringID := strings.ReplaceAll(args["id"].(string), "ObjectID(\"", "")
	stringID = strings.ReplaceAll(stringID, "\")", "")

	// primitive.ObjectID 로 변환
	id, _ := primitive.ObjectIDFromHex(stringID)
	password := args["password"].(string)
	passwordEnc := utils.Encrypt(password)

	// 현재 댓글 정보
	currentReply, err := service.repository.FindById(id)

	// 대댓글이 달려 있는지 카운트로 판별
	count, err := service.repository.CountByGroupNo(currentReply.Group_no)

	if count > 1 && currentReply.Depth == 0 {
		// 대댓글이 달려있고, Depth가 0 이면, blind 처리
		res, err = service.repository.BlindReply(id, passwordEnc)
	} else {

		// wjkim : 아니이거 위에 블라인드 처리부터 signFlag 로 판별해야하잖아...
		if signFlag == false && password != "" {
			res, err = service.repository.DeleteReply(id, passwordEnc)
		} else if signFlag == true {
			res, err = service.repository.DeleteReply(id, passwordEnc)
		}
	}

	return res, err
}
