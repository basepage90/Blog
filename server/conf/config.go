package conf

import (
	"fmt"
	"log"

	"github.com/joho/godotenv"
)

var MysqlConfig string
var MongoDBConfig string

var IsLocal bool

var BaseURL string
var TokenURL string
var ServerPort string
var ClientPort string

func SetMode(mode string) {
	IsLocal = mode == "local"
	if IsLocal {
		BaseURL = "http://localhost:3000"
		TokenURL = "localhost"
		ServerPort = ":5000"
		ClientPort = ":3000"
	} else {
		BaseURL = "https://crispyblog.kr"
		TokenURL = "crispyblog.kr"
		ServerPort = ":5000"
		ClientPort = ":443"
	}
}

// Read dbconfig.env for MysqlConfig
func init() {
	appConfig, err := godotenv.Read("./conf/dbConfig.env")
	if err != nil {
		log.Fatal("Error reading .env file")
	}

	MysqlConfig = fmt.Sprintf(
		"%s:%s@%s(%s:%s)/%s?charset=utf8&parseTime=True&loc=Local",
		appConfig["MYSQL_USER"],
		appConfig["MYSQL_PASSWORD"],
		appConfig["MYSQL_PROTOCOL"],
		appConfig["MYSQL_HOST"],
		appConfig["MYSQL_PORT"],
		appConfig["MYSQL_DBNAME"],
	)

	MongoDBConfig = fmt.Sprintf(
		"mongodb://%s:%s@%s:%s/%s",
		appConfig["MONGODB_USER"],
		appConfig["MONGODB_PASSWORD"],
		appConfig["MONGODB_HOST"],
		appConfig["MONGODB_PORT"],
		appConfig["MONGODB_DBNAME"],
	)
}
