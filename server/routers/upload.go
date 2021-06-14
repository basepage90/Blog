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
	Router.POST("/upload/postImg", uploadSingle_postImg)
	Router.POST("/upload/thumbnail", uploadSingle_thumbnail)
}

func uploadSingle_postImg(ctx *gin.Context) {
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
	uploadPath := "static/img/postImg/" + filename

	log.Println(filename)
	if err := ctx.SaveUploadedFile(file, uploadPath); err != nil {
		ctx.String(http.StatusBadRequest, fmt.Sprintf("upload file err: %s", err.Error()))
		return
	}

	data := map[string]string{
		"filePath": "http://wjk.ddns.net:5000/" + uploadPath,
	}

	ctx.JSON(200, gin.H{
		"data": data,
	})
}

func uploadSingle_thumbnail(ctx *gin.Context) {
	// FormFile just get single file
	file, err := ctx.FormFile("thumbnail")

	if err != nil {
		ctx.String(http.StatusBadRequest, fmt.Sprintf("get form err: %s", err.Error()))
		return
	}

	//  uuid + filename
	filename := filepath.Base(file.Filename)
	uuidKey := uuid.New().String()
	filename = uuidKey + "_" + filename
	uploadPath := "static/img/thumbnail/" + filename

	log.Println(filename)
	if err := ctx.SaveUploadedFile(file, uploadPath); err != nil {
		ctx.String(http.StatusBadRequest, fmt.Sprintf("upload file err: %s", err.Error()))
		return
	}

	ctx.JSON(200, gin.H{
		"filePath": "http://wjk.ddns.net:5000/" + uploadPath,
	})
}
