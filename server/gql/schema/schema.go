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
}

func NewSchema(articlesRsv resolver.ArticlesResolver) Schema {
	return &schema{
		articlesRsv: articlesRsv,
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
					"id": &graphql.ArgumentConfig{
						Type: graphql.NewNonNull(graphql.String),
					},
					"title": &graphql.ArgumentConfig{
						Type: graphql.NewNonNull(graphql.String),
					},
				},
				Resolve: s.articlesRsv.CreateArticles,
			},

			"updateArticles": &graphql.Field{
				Type:        articlesType, // the return type for this field
				Description: "Update existing todo, mark it done or not done",
				Args: graphql.FieldConfigArgument{
					"id": &graphql.ArgumentConfig{
						Type: graphql.NewNonNull(graphql.String),
					},
					"title": &graphql.ArgumentConfig{
						Type: graphql.NewNonNull(graphql.String),
					},
				},
				Resolve: func(params graphql.ResolveParams) (interface{}, error) {
					title, _ := params.Args["title"].(string)
					id, _ := params.Args["id"].(string)
					affectedArticles := models.Articles{}

					for i := 0; i < len(ArticlesList); i++ {
						if ArticlesList[i].Id == id {
							ArticlesList[i].Title = title
							affectedArticles = ArticlesList[i]
							break
						}
					}
					return affectedArticles, nil
				},
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
						Type: graphql.String,
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
						Type: graphql.String,
					},
					"title": &graphql.ArgumentConfig{
						Type: graphql.String,
					},
				},
				Resolve: s.articlesRsv.GetArticlesAll,
			},
		},
	}
	return graphql.NewObject(objectConfig)
}
