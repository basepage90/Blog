package schema

import "github.com/graphql-go/graphql"

var articlesType = graphql.NewObject(graphql.ObjectConfig{
	Name: "Articles",
	Fields: graphql.Fields{
		"id": &graphql.Field{
			Type: graphql.String,
		},
		"title": &graphql.Field{
			Type: graphql.String,
		},
		"subtitle": &graphql.Field{
			Type: graphql.String,
		},
		"info": &graphql.Field{
			Type: graphql.String,
		},
		"desc": &graphql.Field{
			Type: graphql.String,
		},
		"contents": &graphql.Field{
			Type: graphql.String,
		},
		"category_lg": &graphql.Field{
			Type: graphql.String,
		},
		"category_md": &graphql.Field{
			Type: graphql.String,
		},
	},
})
