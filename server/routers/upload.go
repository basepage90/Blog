package routers

import (
	"fmt"
	"net/http"
	"path/filepath"
	"strings"

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

	if err := ctx.SaveUploadedFile(file, uploadPath); err != nil {
		ctx.String(http.StatusBadRequest, fmt.Sprintf("upload file err: %s", err.Error()))
		return
	}

	data := map[string]string{
		"filePath": "http://crispyblog.ddns.net:5000/" + uploadPath,
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
	if len(filename) > 120 {
		// 수정을 통해서, 반복하여 업로드하다보면, UUID가 계속해서 쌓이게되므로
		// 파일이름 길이가 120을 넘어간다면, 마지막 매칭되는 "_" 를 찾아서 substring 한다.
		substrLenth := strings.LastIndexAny(filename, "_") + 1
		filename = filename[substrLenth:]
	}
	uuidKey := uuid.New().String()
	filename = uuidKey + "_" + filename
	uploadPath := "static/img/thumbnail/" + filename

	if err := ctx.SaveUploadedFile(file, uploadPath); err != nil {
		ctx.String(http.StatusBadRequest, fmt.Sprintf("upload file err: %s", err.Error()))
		return
	}

	ctx.JSON(200, gin.H{
		"filePath": "http://crispyblog.ddns.net:5000/" + uploadPath,
	})
}
