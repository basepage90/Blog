package routers

import (
	"fmt"
	"log"
	"net/http"
	"path/filepath"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
)

func InitUploadRouter(Router *gin.RouterGroup) {
	Router.POST("/upload", uploadSingle)
}

func uploadSingle(ctx *gin.Context) {
	// FormFile just get single file
	// react-simplemde-editor(my client) uses "image" as the file name.
	file, err := ctx.FormFile("image")

	if err != nil {
		ctx.String(http.StatusBadRequest, fmt.Sprintf("get form err: %s", err.Error()))
		return
	}

	//  uuid + filename
	filename := filepath.Base(file.Filename)
	uuidKey := uuid.New().String()
	filename = uuidKey + "_" + filename
	uploadPath := "static/img/upload/" + filename

	log.Println(filename)
	if err := ctx.SaveUploadedFile(file, uploadPath); err != nil {
		ctx.String(http.StatusBadRequest, fmt.Sprintf("upload file err: %s", err.Error()))
		return
	}

	data := map[string]string{
		"filePath": "http://wjk.ddns.net:5000/" + uploadPath,
	}

	ctx.JSON(200, gin.H{
		"status":    "posted",
		"file name": file.Filename,
		"data":      data,
	})
}
