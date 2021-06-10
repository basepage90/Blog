package routers

import (
	"github.com/gin-gonic/gin"
	"github.com/woojebiz/gin-web/server/middleware"
)

// Initialize Router Group
func InitRouter() {
	r := gin.New()

	// Set a lower memory limit for multipart forms (default is 32 MiB)
	r.MaxMultipartMemory = 8 << 20 // 8 MiB

	r.Use(gin.Logger(), middleware.Logger())

	r.LoadHTMLGlob("templates/*")
	r.Static("/static", "static")

	r.Use(middleware.CORSMiddleware())

	// Init Router Group
	rgGuest := r.Group("")
	InitLoginRouter(rgGuest)
	InitUploadRouter(rgGuest)

	rgUser := r.Group("", middleware.AuthorizeJWT())
	InitIndexRouter(rgUser)
	InitArticleRouter(rgUser)

	rgGql := r.Group("")
	InitGql(rgGql)

	r.Run(":5000")
}
