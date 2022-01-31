package schema

import "github.com/graphql-go/graphql"

var notificationType = graphql.NewObject(graphql.ObjectConfig{
	Name: "notification",
	Fields: graphql.Fields{
		"id": &graphql.Field{
			Type: graphql.ID,
		},
		"article_id": &graphql.Field{
			Type: graphql.Int,
		},
		"name": &graphql.Field{
			Type: graphql.String,
		},
		"contents": &graphql.Field{
			Type: graphql.String,
		},
		"reg_date": &graphql.Field{
			Type: graphql.String,
		},
		"reading_status": &graphql.Field{
			Type: graphql.String,
		},
	},
})
