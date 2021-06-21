package models

type User struct {
	Email       string `json:"email" gorm:"column:email;primaryKey" binding:"required"`
	Password    string `json:"password" gorm:"column:password"  binding:"required"`
	Nickname    string `json:"nickname" gorm:"column:nickname"  validate:"is-null"`
	Certificate bool   `json:"certificate" gorm:"column:certificate"`
	Uuid        string `json:"uuid" gorm:"column:uuid"`
	Admin_flag  bool   `json:"admin_flag"`
}

func (User) TableName() string {
	return "user"
}
