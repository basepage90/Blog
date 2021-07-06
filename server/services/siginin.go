package services

import (
	"encoding/json"
	"io/ioutil"
	"log"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/woojebiz/gin-web/server/models"
	"github.com/woojebiz/gin-web/server/repositories"
)

type SigninService interface {
	FindByEmail(args map[string]interface{}) (models.User, error)
	Verify(certi_key string) (models.User, error)
	UpdateUUID(user models.User) error
	GetKakaoInfo(ctx *gin.Context) (string, string, error)
}

type signinService struct {
	repository repositories.SigninRepository
}

func NewSigninService(signinRepository repositories.SigninRepository) SigninService {
	return &signinService{
		repository: signinRepository,
	}
}

func (service *signinService) FindByEmail(args map[string]interface{}) (models.User, error) {
	email, _ := args["email"].(string)
	res, err := service.repository.FindByEmail(email)

	return res, err
}

func (service *signinService) Verify(certi_key string) (models.User, error) {
	res, err := service.repository.FindByUUID(certi_key)
	return res, err
}

func (service *signinService) UpdateUUID(user models.User) error {
	_, err := service.repository.UpdateUUID(user)
	return err
}

func (service *signinService) GetKakaoInfo(ctx *gin.Context) (string, string, error) {
	/* 01. get access_token */
	data, _ := ctx.GetRawData()
	jsonData := map[string]string{"access_token": ""}

	err := json.Unmarshal(data, &jsonData)
	if err != nil {
		panic(err)
	}
	access_token := jsonData["access_token"]

	/* 02. get user info */
	requestURL := "https://kapi.kakao.com/v2/user/me"
	req, err := http.NewRequest("GET", requestURL, nil)
	if err != nil {
		panic(err)
	}
	req.Header.Add("Authorization", "Bearer "+access_token)

	client := &http.Client{}
	resp, err := client.Do(req)
	if err != nil {
		panic(err)
	}
	defer resp.Body.Close()

	data, respErr := ioutil.ReadAll(resp.Body)
	if respErr != nil {
		panic(err)
	}

	kakao := models.Kakao{}
	// var people map[string]interface{}
	jsonErr := json.Unmarshal(data, &kakao)
	if jsonErr != nil {
		log.Fatal(jsonErr)
	}

	return kakao.Account.Email, kakao.Properties.Nickname, nil
}
