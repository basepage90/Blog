package services

import (
	"errors"

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
