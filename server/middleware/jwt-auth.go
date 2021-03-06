package middleware

import (
	"log"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/woojebiz/gin-web/server/services"
)

// AuthorizeJWT validates the token from the http request, returning a 401 if it's not valid
func AuthorizeJWT() gin.HandlerFunc {
	return func(ctx *gin.Context) {
		// cookie 에서 가져오는 방식 -> tobe sol  : CSRF defence
		tokenString, _ := ctx.Cookie("crispy-token")
		token, err := services.NewJWTService().ValidateToken(tokenString)

		if err != nil {
			log.Println(err)
			ctx.AbortWithStatus(http.StatusUnauthorized)
			return
		}

		if token.Valid {
			// claims := token.Claims.(jwt.MapClaims)
			// log.Println("Claims[Name]: ", claims["name"])
			// log.Println("Claims[Admin]: ", claims["admin"])
			// log.Println("Claims[Issuer]: ", claims["iss"])
			// log.Println("Claims[IssuedAt]: ", claims["iat"])
			// log.Println("Claims[ExpiresAt]: ", claims["exp"])
		} else {
			log.Println(err)
			ctx.AbortWithStatus(http.StatusUnauthorized)
		}

	}
}
