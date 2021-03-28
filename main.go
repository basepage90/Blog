package main

import (
	"io"
	"os"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/woojebiz/gin-web/routers"
)

func main() {
	setupLogOutPut()
	routers.InitRouter()
}

func setupLogOutPut() {
	// go 는 date 형식이 특이하다
	// 2006-01-02 15:04:05
	logFileName := "gin-web" + "_" + time.Now().Format("2006-01-02_150405") + ".log"
	logPath := "./storage/log/"
	f, _ := os.Create(logPath + logFileName)
	gin.DefaultWriter = io.MultiWriter(f, os.Stdout)
}
