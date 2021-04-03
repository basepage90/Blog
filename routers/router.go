package routers

import (
	"github.com/gin-gonic/gin"
	"github.com/woojebiz/gin-web/middleware"
)

// Initialize Router Group
func InitRouter() {

	r := gin.New()
	r.Use(gin.Logger(), middleware.Logger())

	r.LoadHTMLGlob("templates/*")

	// Init Router Group
	rgGuest := r.Group("")
	{
		InitLoginRouter(rgGuest)
	}
	// Init Router Group
	rgUser := r.Group("", middleware.AuthorizeJWT())
	{
		InitIndexRouter(rgUser)
		InitArticleRouter(rgUser)
	}

	r.Run(":8080")
}
