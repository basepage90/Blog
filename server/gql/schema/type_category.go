package schema

import (
	"github.com/graphql-go/graphql"
)

var categoryType = graphql.NewObject(graphql.ObjectConfig{
	Name: "Cateogry",
	Fields: graphql.Fields{
		"category_lg": &graphql.Field{
			Type: graphql.String,
		},
		"screen_name": &graphql.Field{
			Type: graphql.String,
		},
		"category_md": &graphql.Field{
			Type: graphql.NewList(CategoryMd),
		},
		"sno": &graphql.Field{
			Type: graphql.Int,
		},
	},
})

var CategoryMd = graphql.NewObject(graphql.ObjectConfig{
	Name: "Category_md",
	Fields: graphql.Fields{
		"name": &graphql.Field{
			Type: graphql.String,
		},
		"screen_name": &graphql.Field{
			Type: graphql.String,
		},
		"sno": &graphql.Field{
			Type: graphql.Int,
		},
	},
})
