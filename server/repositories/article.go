package repositories

import (
	_ "github.com/go-sql-driver/mysql"
	"github.com/jinzhu/gorm"
	"github.com/woojebiz/gin-web/server/db"
	"github.com/woojebiz/gin-web/server/models"
)

type ArticleRepository interface {
	Save(article models.Article) error
	Update(article models.Article) error
	Delete(article models.Article) error
	DeleteById(id string) error
	FindById(id string) (models.Article, error)
	FindAll() ([]models.Article, error)
	CloseDB()
}

type articleRepository struct {
	db *gorm.DB
}

func NewArticleRepository() ArticleRepository {
	db := db.GetDB()
	db.AutoMigrate(&models.Article{})
	return &articleRepository{
		db: db,
	}
}

func (r *articleRepository) CloseDB() {
	err := r.db.Close()
	if err != nil {
		panic("Failed to close database")
	}
}

func (r *articleRepository) Save(article models.Article) error {
	return r.db.Create(&article).Error
}

func (r *articleRepository) Update(article models.Article) error {
	return r.db.Save(&article).Error
}

func (r *articleRepository) Delete(article models.Article) error {
	return r.db.Delete(&article).Error
}

func (r *articleRepository) DeleteById(id string) error {
	return r.db.Delete(&models.Article{Id: id}).Error
}

func (r *articleRepository) FindById(id string) (models.Article, error) {
	var article models.Article
	return article, r.db.Where(&models.Article{Id: id}).Find(&article).Error
}

func (r *articleRepository) FindAll() ([]models.Article, error) {
	var articles []models.Article
	return articles, r.db.Set("gorm:auto_preload", true).Find(&articles).Error
}
