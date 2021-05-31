package models

type Category struct {
	Category_lg string        `json:"category_lg"`
	Screen_name string        `json:"screen_name"`
	Category_md []*CategoryMD `json:"category_md"`
	Sno         int           `json:"sno"`
}

type CategoryMD struct {
	Name        string `json:"name"`
	Screen_name string `json:"screen_name"`
	Sno         int    `json:"sno"`
}
