package models

type Articles struct {
	Id          string `json:"id"`
	Title       string `json:"title"`
	Subtitle    string `json:"subtitle"`
	Info        string `json:"info"`
	Desc        string `json:"desc"`
	Contents    string `json:"contents"`
	Category_lg string `json:"category_lg"`
	Category_md string `json:"category_md"`
}
