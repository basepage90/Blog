package db

import (
	"context"

	"github.com/jinzhu/gorm"
	"github.com/woojebiz/gin-web/server/conf"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

var client *mongo.Client
var db *gorm.DB

// MongoDB
func ConnectionMongoDB() {
	clientOptions := options.Client().ApplyURI(conf.MongoDBConfig)
	conn, err := mongo.Connect(context.TODO(), clientOptions)

	if err != nil {
		panic("Failed to connect database")
	}
	client = conn
}

func GetClient() *mongo.Client {
	return client
}

func CloseMongoDB() {
	err := client.Disconnect(context.TODO())
	if err != nil {
		panic("Failed to close database")
	}
}

// Mysql
func ConnectMysql() {
	conn, err := gorm.Open("mysql", conf.MysqlConfig)
	if err != nil {
		panic("Failed to connect database")
	}
	db = conn
}

func GetDB() *gorm.DB {
	return db
}

func CloseMysql() {
	err := db.Close()
	if err != nil {
		panic("Failed to close database")
	}
}
