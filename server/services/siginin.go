package services

import (
	"github.com/woojebiz/gin-web/server/models"
	"github.com/woojebiz/gin-web/server/repositories"
)

type SigninService interface {
	FindByEmail(args map[string]interface{}) (models.User, error)
	Verify(certi_key string) (models.User, error)
	UpdateUUID(user models.User) error
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
