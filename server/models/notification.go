package models

import "go.mongodb.org/mongo-driver/bson/primitive"

type Notification struct {
	Id             primitive.ObjectID `bson:"_id" json:"id"`
	Article_id     int                `json:"article_id"`
	Name           string             `json:"name"`
	Contents       string             `json:"contents"`
	Reg_date       string             `json:"reg_date"`
	Reading_status string             `josn:"reading_status"`
}
