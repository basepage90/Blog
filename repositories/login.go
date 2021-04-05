package repositories

import (
	"errors"

	_ "github.com/go-sql-driver/mysql"
	"github.com/jinzhu/gorm"
	"github.com/woojebiz/gin-web/conf"
	"github.com/woojebiz/gin-web/models"
)

type LoginRepository interface {
	Save(user models.User) error
	FindByUsername(username string) (models.User, error)
	Login(username string, password string) (models.User, error)
	CloseDB()
}

type loginRepository struct {
	db *gorm.DB
}

func NewLoginRepository() LoginRepository {
	db, err := gorm.Open("mysql", conf.MysqlConfig)
	if err != nil {
		panic("Failed to connect database")
	}
	db.AutoMigrate(&models.User{})
	return &loginRepository{
		db: db,
	}
}

func (r *loginRepository) CloseDB() {
	err := r.db.Close()
	if err != nil {
		panic("Failed to close database")
	}
}

func (r *loginRepository) Save(user models.User) error {
	return r.db.Create(&user).Error
}

func (r *loginRepository) FindByUsername(username string) (models.User, error) {
	var user models.User
	// if username == "" {
	// 	return user, errors.New("params nil error!!!")
	// }
	return user, r.db.Where(&models.User{Username: username}).Find(&user).Error
}

func (r *loginRepository) Login(username string, password string) (models.User, error) {
	var user models.User
	if username == "" || password == "" {
		return user, errors.New("params nil error!!!")
	}
	return user, r.db.Where(&models.User{Username: username, Password: password}).Find(&user).Error
}
