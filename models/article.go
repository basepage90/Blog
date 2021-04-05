package models

import "fmt"

type Article struct {
	Id      string `gorm:"column:id" json:"id"`
	Title   string `gorm:"column:title" json:"title"`
	Content string `gorm:"column:content" json:"content"`
	Desc    string `gorm:"column:desc" json:"desc"`
}

func (Article) TableName() string {
	fmt.Println("### This action makes so many calls to TableName say 'article'")
	return "article"
}
