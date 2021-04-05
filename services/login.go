package services

import (
	"errors"

	"github.com/jinzhu/gorm"
	"github.com/woojebiz/gin-web/models"
	"github.com/woojebiz/gin-web/repositories"
)

type LoginService interface {
	Login(username string, password string) error
	Signup(user models.User) error
}

type loginService struct {
	repository repositories.LoginRepository
}

func NewLoginService(loginRepository repositories.LoginRepository) LoginService {
	return &loginService{
		repository: loginRepository,
	}
}
func (service *loginService) Login(username string, password string) error {
	_, error := service.repository.Login(username, password)
	if error == nil {
		return nil
	}
	return error
}

func (service *loginService) Signup(user models.User) error {
	res, err := service.repository.FindByUsername(user.Username)
	if res.Username != "" {
		return errors.New("Alreay Existing Username")
	} else if err != gorm.ErrRecordNotFound {
		return err
	}
	return service.repository.Save(user)
}
