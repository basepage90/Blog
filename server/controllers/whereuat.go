package controllers

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
	"golang.org/x/oauth2/google"
)

type SendPushRequest struct {
	TargetToken string `json:"target_token" binding:"required"`
	Title       string `json:"title" binding:"required"`
	Body        string `json:"body" binding:"required"`
}

func HandleSendPushGoogle(c *gin.Context) {
	var req SendPushRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	accessToken, err := getAccessTokenGoogle()
	if err != nil {
		log.Printf("FCM access token error (google): %v", err)
		c.JSON(http.StatusInternalServerError, gin.H{"error": "failed to get access token"})
		return
	}

	err = sendFCMMessageGoogle(accessToken, req.TargetToken, req.Title, req.Body)
	if err != nil {
		log.Printf("FCM send error (google): %v", err)
		c.JSON(http.StatusInternalServerError, gin.H{"error": "failed to send push"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"success": true})
}

func HandleSendPush(c *gin.Context) {
	var req SendPushRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	accessToken, err := getAccessToken()
	if err != nil {
		log.Printf("FCM access token error: %v", err)
		c.JSON(http.StatusInternalServerError, gin.H{"error": "failed to get access token"})
		return
	}

	err = sendFCMMessage(accessToken, req.TargetToken, req.Title, req.Body)
	if err != nil {
		log.Printf("FCM send error: %v", err)
		c.JSON(http.StatusInternalServerError, gin.H{"error": "failed to send push"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"success": true})
}

func getAccessToken() (string, error) {
	jsonKey, err := ioutil.ReadFile("conf/firebase-service-account.json")
	if err != nil {
		return "", fmt.Errorf("read service account: %w", err)
	}

	conf, err := google.JWTConfigFromJSON(jsonKey, "https://www.googleapis.com/auth/firebase.messaging")
	if err != nil {
		return "", fmt.Errorf("jwt config: %w", err)
	}

	token, err := conf.TokenSource(nil).Token()
	if err != nil {
		return "", fmt.Errorf("token: %w", err)
	}

	return token.AccessToken, nil
}

func sendFCMMessage(accessToken, targetToken, title, body string) error {
	projectID := "whereuat-5fd18"
	url := fmt.Sprintf("https://fcm.googleapis.com/v1/projects/%s/messages:send", projectID)

	message := map[string]interface{}{
		"message": map[string]interface{}{
			"token": targetToken,
			"data": map[string]string{
				"title": title,
				"body":  body,
			},
		},
	}

	jsonBody, err := json.Marshal(message)
	if err != nil {
		return err
	}

	req, err := http.NewRequest("POST", url, bytes.NewBuffer(jsonBody))
	if err != nil {
		return err
	}
	req.Header.Set("Authorization", "Bearer "+accessToken)
	req.Header.Set("Content-Type", "application/json")

	client := &http.Client{Timeout: 10 * time.Second}
	resp, err := client.Do(req)
	if err != nil {
		return err
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		respBody, _ := ioutil.ReadAll(resp.Body)
		return fmt.Errorf("FCM error %d: %s", resp.StatusCode, string(respBody))
	}

	return nil
}

func getAccessTokenGoogle() (string, error) {
	jsonKey, err := ioutil.ReadFile("conf/firebase-service-account-google.json")
	if err != nil {
		return "", fmt.Errorf("read service account: %w", err)
	}

	conf, err := google.JWTConfigFromJSON(jsonKey, "https://www.googleapis.com/auth/firebase.messaging")
	if err != nil {
		return "", fmt.Errorf("jwt config: %w", err)
	}

	token, err := conf.TokenSource(nil).Token()
	if err != nil {
		return "", fmt.Errorf("token: %w", err)
	}

	return token.AccessToken, nil
}

func sendFCMMessageGoogle(accessToken, targetToken, title, body string) error {
	projectID := "whereuat-17df6"
	url := fmt.Sprintf("https://fcm.googleapis.com/v1/projects/%s/messages:send", projectID)

	message := map[string]interface{}{
		"message": map[string]interface{}{
			"token": targetToken,
			"data": map[string]string{
				"title": title,
				"body":  body,
			},
		},
	}

	jsonBody, err := json.Marshal(message)
	if err != nil {
		return err
	}

	req, err := http.NewRequest("POST", url, bytes.NewBuffer(jsonBody))
	if err != nil {
		return err
	}
	req.Header.Set("Authorization", "Bearer "+accessToken)
	req.Header.Set("Content-Type", "application/json")

	client := &http.Client{Timeout: 10 * time.Second}
	resp, err := client.Do(req)
	if err != nil {
		return err
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		respBody, _ := ioutil.ReadAll(resp.Body)
		return fmt.Errorf("FCM error %d: %s", resp.StatusCode, string(respBody))
	}

	return nil
}
