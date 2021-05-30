package routers

import (
	"github.com/gin-gonic/gin"
	"github.com/woojebiz/gin-web/server/middleware"
)

// Initialize Router Group
func InitRouter() {
	r := gin.New()
	r.Use(gin.Logger(), middleware.Logger())

	r.LoadHTMLGlob("templates/*")
	r.Static("/static", "static")

	// Init Router Group
	rgGuest := r.Group("")
	InitLoginRouter(rgGuest)

	rgUser := r.Group("", middleware.AuthorizeJWT())
	InitIndexRouter(rgUser)
	InitArticleRouter(rgUser)

	rgGql := r.Group("")
	InitGql(rgGql)

	r.Run(":8080")
}
