package repositories

import (
	_ "github.com/go-sql-driver/mysql"
	"github.com/jinzhu/gorm"
	"github.com/woojebiz/gin-web/server/conf"
	"github.com/woojebiz/gin-web/server/models"
)

type LoginRepository interface {
	Save(user models.User) error
	FindByEmail(email string) (models.User, error)
	Login(user models.User) (models.User, error)
	SaveUUID(user models.User) error
	UpdateCerti(certi_key string) error
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

func (r *loginRepository) FindByEmail(email string) (models.User, error) {
	var user models.User
	return user, r.db.Where(&models.User{Email: email}).Find(&user).Error
}

func (r *loginRepository) Login(user models.User) (models.User, error) {
	var res models.User
	return res, r.db.Where(&models.User{Email: user.Email, Password: user.Password}).Find(&res).Error
}

func (r *loginRepository) SaveUUID(user models.User) error {
	return r.db.Model(user).Where(&models.User{Email: user.Email}).Update(&models.User{Uuid: user.Uuid}).Error
}

func (r *loginRepository) UpdateCerti(certi_key string) error {
	return r.db.Table("user").Where(&models.User{Uuid: certi_key}).Update(&models.User{Certificate: "Y"}).Error
}
