package models

type Article struct {
	Id      string `gorm:"column:id" json:"id"`
	Title   string `gorm:"column:title" json:"title"`
	Content string `gorm:"column:content" json:"content"`
	Desc    string `gorm:"column:desc" json:"desc"`
}

func (Article) TableName() string {
	return "article"
}
