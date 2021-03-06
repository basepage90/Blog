package routers

import (
	"github.com/gin-gonic/gin"
	"github.com/woojebiz/gin-web/server/gql/resolver"
	"github.com/woojebiz/gin-web/server/repositories"
	"github.com/woojebiz/gin-web/server/services"
)

func InitSigninRouter(Router *gin.RouterGroup) {
	signinRepository := repositories.NewSigninRepository()
	signinService := services.NewSigninService(signinRepository)
	jwtService := services.NewJWTService()
	signinResolver := resolver.NewSigninResolver(signinService, jwtService)

	// singin (and signup)
	Router.GET("/signin/verify/:certi_key", signinResolver.Verify)

	// // SNS Signin
	Router.GET("/getRequestURL", signinResolver.GetRequestURL)
	Router.POST("/doSignin/kakao", signinResolver.DoSigninKakao)

	// // signout
	Router.POST("/signout", signinResolver.DeleteToken)
}
