package resolver

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
	"github.com/graphql-go/graphql"
	"github.com/woojebiz/gin-web/server/middleware"
	"github.com/woojebiz/gin-web/server/services"
)

type SigninResolver interface {
	SendAuthEmail(params graphql.ResolveParams) (interface{}, error)
	Verify(ctx *gin.Context)
	DeleteToken(ctx *gin.Context)
	GetCurrentUser(params graphql.ResolveParams) (interface{}, error)
}

type signinResolver struct {
	signinService services.SigninService
	jwtService    services.JWTService
}

func NewSigninResolver(signinService services.SigninService, jwtService services.JWTService) SigninResolver {
	return &signinResolver{
		signinService: signinService,
		jwtService:    jwtService,
	}
}

func (rsv *signinResolver) SendAuthEmail(params graphql.ResolveParams) (interface{}, error) {
	// var ctx *gin.Context

	res, err := rsv.signinService.FindByEmail(params.Args)

	// email 이 find 되었다면, uuid를 update 하고 인증메일을 발송한다.
	if err == nil && res.Admin_flag == true {
		uuidKey := uuid.New().String()
		res.Uuid = uuidKey
		err := rsv.signinService.UpdateUUID(res)
		if err == nil {
			// 인증메일 발송
			sendErr := middleware.SendCertiMail(res)
			if sendErr != nil {
				// ctx.JSON(http.StatusUnauthorized, gin.H{})
			}
		}
	}
	return res, err
}

func (rsv *signinResolver) Verify(ctx *gin.Context) {
	certi_key := ctx.Param("certi_key")

	res, _ := rsv.signinService.Verify(certi_key)

	if res.Admin_flag == true {
		if token := rsv.jwtService.GenerateToken(res.Email, true); token != "" {
			// 토큰 발행 (cookie 저장 방식)
			ctx.SetCookie("crispy-token", token, 60*60*24, "/", "wjk.ddns.net", false, true)
		} else {
			// 토큰 발행 에러
			ctx.JSON(http.StatusUnauthorized, gin.H{"err": "token genetation error!"})
		}

		ctx.Redirect(http.StatusFound, "http://wjk.ddns.net:80/")
	} else {
		ctx.Redirect(http.StatusFound, "http://wjk.ddns.net:80/verifyError")
	}
}

func (rsv *signinResolver) DeleteToken(ctx *gin.Context) {
	// Delete cookie : 3rd param is -1
	ctx.SetCookie("crispy-token", "", -1, "/", "wjk.ddns.net", false, true)
}

func (rsv *signinResolver) GetCurrentUser(params graphql.ResolveParams) (interface{}, error) {
	CA := middleware.GetCookieAccess(params.Context)
	if CA.IsSignedIn == true {
		args := map[string]interface{}{
			"email": CA.UserEmail,
		}

		res, err := rsv.signinService.FindByEmail(args)
		return res, err
	} else {
		return nil, nil
	}
}
