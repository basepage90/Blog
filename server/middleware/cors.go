package middleware

import "github.com/gin-gonic/gin"

func CORSMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		c.Header("Access-Control-Allow-Headers", "Content-Type, Authorization, Origin")
		c.Header("Access-Control-Allow-Credentials", "true")
		// Access-Control-Allow-Origin 예외 사항
		// apollo client 에서 credentials: 'include' 옵션 사용시, 와일드카드(*)를 사용하면 CORS  에러가 발생한다.
		// 반드시 도메인을 직접 명시해줘야한다.
		// c.Header("Access-Control-Allow-Origin", "*")
		c.Header("Access-Control-Allow-Origin", "http://wjk.ddns.net")
		c.Header("Access-Control-Allow-Methods", "*")
		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(204)
			return
		}
		c.Next()
	}
}
