package db

import (
	"fmt"

	"github.com/jinzhu/gorm"
	"github.com/woojebiz/gin-web/server/conf"
)

var db *gorm.DB

func Connection() {
	fmt.Println("conction db conn------------------------")
	conn, err := gorm.Open("mysql", conf.MysqlConfig)
	if err != nil {
		panic("Failed to connect database")
	}
	db = conn
}

func GetConn() *gorm.DB {
	return db
}

func CloseDB() {
	err := db.Close()
	if err != nil {
		panic("Failed to close database")
	}
}
