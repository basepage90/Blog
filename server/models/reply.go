package models

import "go.mongodb.org/mongo-driver/bson/primitive"

type Reply struct {
	Id           primitive.ObjectID `bson:"_id" json:"id"`
	Article_id   int                `json:"article_id"`
	Depth        int                `json:"depth"`
	Group_no     int                `josn:"group_no"`
	Sibling_name string             `json:"sibling_name"`
	Name         string             `json:"name"`
	Password     string             `json:"password "`
	Contents     string             `json:"contents"`
	Reg_date     string             `json:"reg_date"`
	Blind        bool               `josn:"blind"`
	Admin_flag   bool               `josn:"admin_flag"`
	// Secret       bool               `json:"secret"`
}
