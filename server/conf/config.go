package conf

import (
	"fmt"
	"log"

	"github.com/joho/godotenv"
)

var MysqlConfig string

var MongoDBConfig string

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
		"mongodb://%s:%s",
		appConfig["MONGODB_HOST"],
		appConfig["MONGODB_PORT"],
	)
}
