package routers

import (
	"github.com/gin-gonic/gin"
)

// Initialize Router Group
func InitRouter() {
	r := gin.Default()

	r.LoadHTMLGlob("templates/*")

	rg := r.Group("")
	{
		InitIndexRouter(rg)
		InitArticleRouter(rg)
	}

	r.Run()
}
