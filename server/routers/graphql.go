package routers

import (
	"github.com/99designs/gqlgen/graphql/playground"
	"github.com/gin-gonic/gin"
	"github.com/graphql-go/graphql"
	"github.com/graphql-go/handler"
	"github.com/woojebiz/gin-web/server/gql/resolver"
	"github.com/woojebiz/gin-web/server/gql/schema"
	"github.com/woojebiz/gin-web/server/repositories"
	"github.com/woojebiz/gin-web/server/services"
)

func InitGql(Router *gin.RouterGroup) {
	Router.POST("/gql", graphqlHandler())
	Router.GET("/play", playgroundHandler())
}

func graphqlHandler() gin.HandlerFunc {
	articlesRepository := repositories.NewArticlesRepository()
	articlesService := services.NewArticlesService(articlesRepository)
	articlesResolver := resolver.NewArticlesResolver(articlesService)

	categoryRepository := repositories.NewCategoryRepository()
	categoryService := services.NewCategoryService(categoryRepository)
	categoryResolver := resolver.NewCategoryResolver(categoryService)

	signinRepository := repositories.NewSigninRepository()
	signinService := services.NewSigninService(signinRepository)
	jwtService := services.NewJWTService()
	signinResolver := resolver.NewSigninResolver(signinService, jwtService)

	notificationRepository := repositories.NewNotificationRepository()
	notificationService := services.NewNotificationService(notificationRepository)
	notificationResolver := resolver.NewNotificationResolver(notificationService)

	replyRepository := repositories.NewReplyRepository()
	replyService := services.NewReplyService(replyRepository, notificationRepository)
	replyResolver := resolver.NewReplyResolver(replyService)

	schema := schema.NewSchema(articlesResolver, categoryResolver, signinResolver, replyResolver, notificationResolver)

	graphqlSchema, _ := graphql.NewSchema(graphql.SchemaConfig{
		Query:    schema.Query(),
		Mutation: schema.Mutation(),
	})

	h := handler.New(&handler.Config{
		Schema:   &graphqlSchema,
		Pretty:   true,
		GraphiQL: true,
	})

	return func(ctx *gin.Context) {
		h.ServeHTTP(ctx.Writer, ctx.Request)
	}
}

func playgroundHandler() gin.HandlerFunc {
	h := playground.Handler("GraphQL", "/gql")

	return func(ctx *gin.Context) {
		h.ServeHTTP(ctx.Writer, ctx.Request)
	}
}
