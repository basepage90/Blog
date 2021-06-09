package models

type Sequence struct {
	Id  string `bson:"_id" json:"id"`
	Seq int    `json:"seq"`
}
