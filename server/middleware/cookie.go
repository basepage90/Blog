package middleware

import (
	"context"
	"errors"
	"net/http"
	"time"

	"github.com/dgrijalva/jwt-go"
	"github.com/gin-gonic/gin"
	"github.com/woojebiz/gin-web/server/services"
)

type CookieAccess struct {
	Writer     http.ResponseWriter
	IsSignedIn bool
	UserEmail  string
}

// method to write cookie
func (this *CookieAccess) SetToken(token string) {
	http.SetCookie(this.Writer, &http.Cookie{
		Name:     "crispy-token",
		Value:    token,
		HttpOnly: true,
		Path:     "/",
		Expires:  time.Now().Add(time.Hour * 72),
	})
}
func extractToken(ctx *gin.Context) (bool, string, error) {
	cookieStruct, err := ctx.Request.Cookie("crispy-token")
	if err != nil {
		return false, "", errors.New("There is no token in cookies")
	}

	token, err2 := services.NewJWTService().ValidateToken(cookieStruct.Value)

	claims := token.Claims.(jwt.MapClaims)
	email := claims["name"].(string)

	if err2 != nil {
		return false, "", err2
	}

	if token.Valid {
		return true, email, nil
	} else {
		return false, "", nil
	}

}

func setValInCtx(ctx *gin.Context, val interface{}) {
	newCtx := context.WithValue(ctx.Request.Context(), "token", val)
	ctx.Request = ctx.Request.WithContext(newCtx)
}

func CookieMiddleware() gin.HandlerFunc {
	return func(ctx *gin.Context) {
		cookieA := CookieAccess{
			Writer: ctx.Writer,
		}

		// &cookieA is a pointer so any changes in future is changing cookieA is context
		setValInCtx(ctx, &cookieA)

		tokenFlag, email, err := extractToken(ctx)
		if err != nil {
			cookieA.IsSignedIn = tokenFlag
			cookieA.UserEmail = email
			ctx.Next()
			return
		}

		cookieA.IsSignedIn = tokenFlag
		cookieA.UserEmail = email

		// calling the actual resolver
		ctx.Next()
		// here will execute after resolver and all other middlewares was called
		// so &cookieA is safe from garbage collector
	}
}

func GetCookieAccess(ctx context.Context) *CookieAccess {
	return ctx.Value("token").(*CookieAccess)
}
