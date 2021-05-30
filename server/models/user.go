package models

type User struct {
	Email       string `gorm:"column:email;primaryKey" json:"email" binding:"required"`
	Password    string `gorm:"column:password" json:"password" binding:"required"`
	Nickname    string `gorm:"column:nickname" json:"nickname" validate:"is-null"`
	Certificate string `gorm:"column:certificate" json:"certificate"`
	Uuid        string `gorm:"column:uuid" json:"uuid"`
}

func (User) TableName() string {
	return "user"
}
