package middleware

import (
	"fmt"
	"time"

	"github.com/gin-gonic/gin"
)

func Logger() gin.HandlerFunc {
	return gin.LoggerWithFormatter(func(param gin.LogFormatterParams) string {
		layout := "2006-01-02 15:04:05.000"
		loc, _ := time.LoadLocation("Asia/Seoul")
		kstTime := param.TimeStamp.In(loc).Format(layout)

		return fmt.Sprintf("%s - [%s] %s %s %d %s \n",
			param.ClientIP,
			kstTime,
			param.Method,
			param.Path,
			param.StatusCode,
			param.Latency,
		)
	})
}
