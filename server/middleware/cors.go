package middleware

import (
	"github.com/gin-gonic/gin"
	"github.com/woojebiz/gin-web/server/conf"
)

func CORSMiddleware() gin.HandlerFunc {
	var allowedOrigins = [...]string{
		conf.BaseURL,
		"https://3.37.93.176",
		"http://localhost:443",
		"http://wjkim.ddns.net:443",
	}
	return func(c *gin.Context) {
		c.Header("Access-Control-Allow-Headers", "Content-Type, Authorization, Origin")
		c.Header("Access-Control-Allow-Credentials", "true")
		// Access-Control-Allow-Origin 예외 사항
		// apollo client 에서 credentials: 'include' 옵션 사용시, 와일드카드(*)를 사용하면 CORS  에러가 발생한다.
		// 반드시 도메인을 직접 명시해줘야한다.
		// request header 의 Origin 이 allowedOrigins 중 하나이면, response header의 Origin 에 해당 값을 설정한다.

		// default origin : dropzone 에서의 cors 때문에 defualt를 설정해둔다.
		c.Header("Access-Control-Allow-Origin", conf.BaseURL)

		requestOrigin := c.Request.Header.Get("Origin")

		for _, origin := range allowedOrigins {
			if origin == requestOrigin {
				c.Header("Access-Control-Allow-Origin", origin)
				break
			}
		}

		c.Header("Access-Control-Allow-Methods", "*")
		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(204)
			return
		}
		c.Next()
	}
}
