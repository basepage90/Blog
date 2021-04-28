package models

type Kakao struct {
	Id      int `json:"id"`
	Account struct {
		Email string `json:"email"`
	} `json:"kakao_account"`
	Properties struct {
		Nickname string `json:"nickname"`
	} `json:"properties"`
}
