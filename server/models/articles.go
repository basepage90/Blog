package models

type Articles struct {
	Id         string `json:"id"`
	Title      string `json:"title"`
	Subtitle   string `json:"subtitle"`
	Info       string `json:"info"`
	Desc       string `json:"desc"`
	Contents   string `json:"contents"`
	CategoryLg string `json:"category_lg"`
	CategoryMd string `json:"category_md"`
}
