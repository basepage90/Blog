package services

import (
	"encoding/json"
	"errors"
	"io/ioutil"
	"log"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/jinzhu/gorm"
	"github.com/woojebiz/gin-web/models"
	"github.com/woojebiz/gin-web/repositories"
)

type LoginService interface {
	Login(user models.User) error
	Signup(user models.User) error
	FindAndCerti(user models.User) int
	SaveUUID(user models.User) error
	Certificate(certi_key string) error
	GetKakaoInfo(ctx *gin.Context) (string, string, error)
	GetLoginSNS(user models.User) (models.User, error)
	SignupSNS(user models.User) error
}

type loginService struct {
	repository repositories.LoginRepository
}

func NewLoginService(loginRepository repositories.LoginRepository) LoginService {
	return &loginService{
		repository: loginRepository,
	}
}
func (service *loginService) Login(user models.User) error {
	_, error := service.repository.Login(user)
	if error == nil {
		return nil
	}
	return error
}

func (service *loginService) Signup(user models.User) error {

	res, err := service.repository.FindByEmail(user.Email)

	if res.Email != "" {
		return errors.New("Alreay Existing Email")
	}

	if err == gorm.ErrRecordNotFound {
		return service.repository.Save(user)
	} else {
		return err
	}
}
func (service *loginService) SignupSNS(user models.User) error {
	return service.repository.Save(user)
}

func (service *loginService) FindAndCerti(user models.User) int {
	res, _ := service.repository.FindByEmail(user.Email)
	if res.Email == "" {
		// not found user email
		return 1
	} else if res.Certificate != "Y" {
		// not confirm certificate
		return 2
	}
	return 0

}

func (service *loginService) SaveUUID(user models.User) error {
	return service.repository.SaveUUID(user)
}

func (service *loginService) Certificate(certi_key string) error {
	return service.repository.UpdateCerti(certi_key)
}

func (service *loginService) GetKakaoInfo(ctx *gin.Context) (string, string, error) {
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

func (service *loginService) GetLoginSNS(user models.User) (models.User, error) {
	res, err := service.repository.FindByEmail(user.Email)
	return res, err
}
