package routers

import (
	"github.com/gin-gonic/gin"
	"github.com/woojebiz/gin-web/middleware"
)

// Initialize Router Group
func InitRouter() {

	// r := gin.Default()

	r := gin.New()
	r.Use(gin.Logger(), middleware.Logger(), middleware.BasicAuth())
	// r.Use(gin.Logger(), middleware.Logger(), middleware.BasicAuth(), gindump.Dump())

	r.LoadHTMLGlob("templates/*")

	rg := r.Group("")
	{
		InitIndexRouter(rg)
		InitArticleRouter(rg)
	}

	r.Run(":8080")
}
