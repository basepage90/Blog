package schema

import (
	"github.com/graphql-go/graphql"
)

var userType = graphql.NewObject(graphql.ObjectConfig{
	Name: "User",
	Fields: graphql.Fields{
		"email": &graphql.Field{
			Type: graphql.String,
		},
		"nickname": &graphql.Field{
			Type: graphql.String,
		},
		"certificate": &graphql.Field{
			Type: graphql.Boolean,
		},
		"admin_flag": &graphql.Field{
			Type: graphql.Boolean,
		},
	},
})
