package controllers

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

func Render(c *gin.Context, data gin.H, templateName string) {

	switch c.Request.Header.Get("Accept") {

	case "application/json":
		// Respond with JSON
		c.JSON(http.StatusOK, data["payload"])
	case "application/xml":
		// Respond with XML
		c.XML(http.StatusOK, data["payload"])
	default:
		// Respond with HTML
		c.HTML(http.StatusOK, templateName, data)
	}

}
