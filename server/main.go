package main

import (
	"io"
	"os"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/woojebiz/gin-web/server/db"
	"github.com/woojebiz/gin-web/server/routers"
)

func main() {
	// setupLogOutPut()

	// db.ConnectMysql()
	// defer db.CloseMysql()

	db.ConnectionMongoDB()
	defer db.CloseMongoDB()

	routers.InitRouter()
}

func setupLogOutPut() {
	// go 는 date 형식이 특이하다
	// 2006-01-02 15:04:05
	loc, _ := time.LoadLocation("Asia/Seoul")
	reg_date := time.Now().In(loc).Format("2006-01-02 15:04:05")
	logFileName := "gin-web" + "_" + reg_date + ".log"
	logPath := "./storage/log/"
	f, _ := os.Create(logPath + logFileName)
	gin.DefaultWriter = io.MultiWriter(f, os.Stdout)
}
