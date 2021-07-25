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

	// r.Use()
	r.Use(middleware.CORSMiddleware())
	r.Use(middleware.CookieMiddleware())

	r.Use(gin.Logger(), middleware.Logger())

	// r.LoadHTMLGlob("templates/*")
	r.Static("/static", "static")

	// Init Router Group
	rgGuest := r.Group("")
	InitUploadRouter(rgGuest)
	InitSigninRouter(rgGuest)
	InitGql(rgGuest)
	// InitLoginRouter(rgGuest)

	// rgUser := r.Group("", middleware.AuthorizeJWT())
	// InitIndexRouter(rgUser)
	// InitArticleRouter(rgUser)

	r.Run(":5000")
}
