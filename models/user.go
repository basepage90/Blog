package models

import "fmt"

type User struct {
	Username string `gorm:"column:username" form:"username"`
	Password string `gorm:"column:password" form:"password"`
	Email    string `gorm:"column:email" form:"email"`
}

func (User) TableName() string {
	fmt.Println("### This action makes so many calls to TableName : say 'user'")
	return "user"
}
