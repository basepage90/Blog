package schema

import (
	"math/rand"

	"github.com/graphql-go/graphql"
	"github.com/woojebiz/gin-web/server/gql/resolver"
	"github.com/woojebiz/gin-web/server/models"
)

type Schema interface {
	Query() *graphql.Object
	Mutation() *graphql.Object
}

type schema struct {
	articlesRsv resolver.ArticlesResolver
	categoryRsv resolver.CategoryResolver
	signinRsv   resolver.SigninResolver
}

func NewSchema(
	articlesRsv resolver.ArticlesResolver,
	categoryRsv resolver.CategoryResolver,
	signinRsv resolver.SigninResolver,
) Schema {
	return &schema{
		articlesRsv: articlesRsv,
		categoryRsv: categoryRsv,
		signinRsv:   signinRsv,
	}
}

var ArticlesList []models.Articles

var letterRunes = []rune("abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ")

func RandStringRunes(n int) string {
	b := make([]rune, n)
	for i := range b {
		b[i] = letterRunes[rand.Intn(len(letterRunes))]
	}
	return string(b)
}

func (s *schema) Mutation() *graphql.Object {
	objectConfig := graphql.ObjectConfig{
		Name: "RootMutation",
		Fields: graphql.Fields{
			"createArticles": &graphql.Field{
				Type:        articlesType,
				Description: "Create new articles",
				Args: graphql.FieldConfigArgument{
					"title": &graphql.ArgumentConfig{
						Type: graphql.NewNonNull(graphql.String),
					},
					"subtitle": &graphql.ArgumentConfig{
						Type: graphql.NewNonNull(graphql.String),
					},
					"desc": &graphql.ArgumentConfig{
						Type: graphql.NewNonNull(graphql.String),
					},
					"contents": &graphql.ArgumentConfig{
						Type: graphql.NewNonNull(graphql.String),
					},
					"category_lg": &graphql.ArgumentConfig{
						Type: graphql.NewNonNull(graphql.String),
					},
					"category_md": &graphql.ArgumentConfig{
						Type: graphql.NewNonNull(graphql.String),
					},
					"thumbnail": &graphql.ArgumentConfig{
						Type: graphql.NewNonNull(graphql.String),
					},
					"privacy": &graphql.ArgumentConfig{
						Type: graphql.NewNonNull(graphql.String),
					},
				},
				Resolve: s.articlesRsv.CreateArticles,
			},
			"updatePrivacy": &graphql.Field{
				Type:        graphql.Int,
				Description: "Update articles's privacy",
				Args: graphql.FieldConfigArgument{
					"id": &graphql.ArgumentConfig{
						Type: graphql.NewNonNull(graphql.Int),
					},
					"privacy": &graphql.ArgumentConfig{
						Type: graphql.NewNonNull(graphql.String),
					},
				},
				Resolve: s.articlesRsv.UpdatePrivacy,
			},
			"updateArticles": &graphql.Field{
				Type:        graphql.Int,
				Description: "Edit articles",
				Args: graphql.FieldConfigArgument{
					"id": &graphql.ArgumentConfig{
						Type: graphql.NewNonNull(graphql.Int),
					},
					"title": &graphql.ArgumentConfig{
						Type: graphql.NewNonNull(graphql.String),
					},
					"subtitle": &graphql.ArgumentConfig{
						Type: graphql.NewNonNull(graphql.String),
					},
					"desc": &graphql.ArgumentConfig{
						Type: graphql.NewNonNull(graphql.String),
					},
					"contents": &graphql.ArgumentConfig{
						Type: graphql.NewNonNull(graphql.String),
					},
					"category_lg": &graphql.ArgumentConfig{
						Type: graphql.NewNonNull(graphql.String),
					},
					"category_md": &graphql.ArgumentConfig{
						Type: graphql.NewNonNull(graphql.String),
					},
					"thumbnail": &graphql.ArgumentConfig{
						Type: graphql.NewNonNull(graphql.String),
					},
					"privacy": &graphql.ArgumentConfig{
						Type: graphql.NewNonNull(graphql.String),
					},
				},
				Resolve: s.articlesRsv.EditArticles,
			},
			"deleteArticles": &graphql.Field{
				Type:        graphql.Int,
				Description: "delete articles by id",
				Args: graphql.FieldConfigArgument{
					"id": &graphql.ArgumentConfig{
						Type: graphql.NewNonNull(graphql.Int),
					},
				},
				Resolve: s.articlesRsv.DeleteArticles,
			},
		},
	}
	return graphql.NewObject(objectConfig)
}

func (s *schema) Query() *graphql.Object {
	objectConfig := graphql.ObjectConfig{
		Name: "RootQuery",
		Fields: graphql.Fields{
			"articles": &graphql.Field{
				Type:        articlesType,
				Description: "Get single articles",
				Args: graphql.FieldConfigArgument{
					"id": &graphql.ArgumentConfig{
						Type: graphql.Int,
					},
				},
				Resolve: s.articlesRsv.GetArticlesById,
			},
			"articlesListByCategory": &graphql.Field{
				Type:        graphql.NewList(articlesType),
				Description: "List of articles by category",
				Args: graphql.FieldConfigArgument{
					"category_lg": &graphql.ArgumentConfig{
						Type: graphql.String,
					},
					"category_md": &graphql.ArgumentConfig{
						Type: graphql.String,
					},
				},
				Resolve: s.articlesRsv.GetArticlesByCategory,
			},
			"articlesList": &graphql.Field{
				Type:        graphql.NewList(articlesType),
				Description: "List of articles",
				Args: graphql.FieldConfigArgument{
					"id": &graphql.ArgumentConfig{
						Type: graphql.Int,
					},
					"title": &graphql.ArgumentConfig{
						Type: graphql.String,
					},
				},
				Resolve: s.articlesRsv.GetArticlesAll,
			},
			"categoryList": &graphql.Field{
				Type:        graphql.NewList(categoryType),
				Description: "List of category",
				Resolve:     s.categoryRsv.GetCategoryAll,
			},
			"sendAuthEmail": &graphql.Field{
				Type:        userType,
				Description: "signin",
				Args: graphql.FieldConfigArgument{
					"email": &graphql.ArgumentConfig{
						Type: graphql.String,
					},
					"password": &graphql.ArgumentConfig{
						Type: graphql.String,
					},
				},
				Resolve: s.signinRsv.SendAuthEmail,
			},
			"getCurrentUser": &graphql.Field{
				Type:        userType,
				Description: "get current user",
				Resolve:     s.signinRsv.GetCurrentUser,
			},
		},
	}
	return graphql.NewObject(objectConfig)
}
