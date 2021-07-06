package schema

import "github.com/graphql-go/graphql"

var replyType = graphql.NewObject(graphql.ObjectConfig{
	Name: "reply",
	Fields: graphql.Fields{
		"id": &graphql.Field{
			Type: graphql.ID,
		},
		"article_id": &graphql.Field{
			Type: graphql.Int,
		},
		"depth": &graphql.Field{
			Type: graphql.Int,
		},
		"group_no": &graphql.Field{
			Type: graphql.Int,
		},
		"sibling_name": &graphql.Field{
			Type: graphql.String,
		},
		"name": &graphql.Field{
			Type: graphql.String,
		},
		"password": &graphql.Field{
			Type: graphql.String,
		},
		// "secret": &graphql.Field{
		// 	Type: graphql.Boolean,
		// },
		"contents": &graphql.Field{
			Type: graphql.String,
		},
		"reg_date": &graphql.Field{
			Type: graphql.String,
		},
		"blind": &graphql.Field{
			Type: graphql.Boolean,
		},
		"admin_flag": &graphql.Field{
			Type: graphql.Boolean,
		},
	},
})
