package models

type Articles struct {
	Id          int    `bson:"_id" json:"id"`
	Title       string `json:"title"`
	Subtitle    string `json:"subtitle"`
	Reg_date    string `json:"reg_date"`
	Desc        string `json:"desc"`
	Contents    string `json:"contents"`
	Category_lg string `json:"category_lg"`
	Category_md string `json:"category_md"`
	Thumbnail   string `json:"thumbnail"`
	Privacy     string `json:"privacy"`
}
