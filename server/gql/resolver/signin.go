package resolver

import (
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
	"github.com/graphql-go/graphql"
	"github.com/woojebiz/gin-web/server/conf"
	"github.com/woojebiz/gin-web/server/middleware"
	"github.com/woojebiz/gin-web/server/services"
)

type SigninResolver interface {
	SendAuthEmail(params graphql.ResolveParams) (interface{}, error)
	Verify(ctx *gin.Context)
	DeleteToken(ctx *gin.Context)
	GetCurrentUser(params graphql.ResolveParams) (interface{}, error)
	GetRequestURL(ctx *gin.Context)
	DoSigninKakao(ctx *gin.Context)
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
			ctx.SetCookie("crispy-token", token, 60*60*24, "/", conf.TokenURL, false, true)
		} else {
			// 토큰 발행 에러
			ctx.JSON(http.StatusUnauthorized, gin.H{"err": "token genetation error!"})
		}
		ctx.Redirect(http.StatusFound, conf.BaseURL+conf.ClientPort)
	} else {
		ctx.Redirect(http.StatusFound, conf.BaseURL+conf.ClientPort+"/verifyError")
	}
}

func (rsv *signinResolver) DeleteToken(ctx *gin.Context) {
	// Delete cookie : 3rd param is -1
	ctx.SetCookie("crispy-token", "", -1, "/", conf.TokenURL, false, true)
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

func (rsv *signinResolver) GetRequestURL(ctx *gin.Context) {
	/* 01. Request token with kakao code */
	host_url := "https://kauth.kakao.com/oauth/token"
	grant_type := "grant_type=authorization_code"
	client_id := "client_id=17e2b41913f7f223f6c370c7cfe2d33b"
	redirect_uri := "redirect_uri=" + conf.BaseURL + conf.ClientPort + "/signin/kakao"
	code := "code=" + ctx.Query("code")

	requestURL := fmt.Sprintf(
		"%s?%s&%s&%s&%s",
		host_url,
		grant_type,
		client_id,
		redirect_uri,
		code)

	fmt.Println("test")

	ctx.JSON(http.StatusOK, gin.H{"requestURL": requestURL})

}

func (rsv *signinResolver) DoSigninKakao(ctx *gin.Context) {
	/* 01. kakao api로 부터 얻은 email을 가져온다 */
	email, _, _ := rsv.signinService.GetKakaoInfo(ctx)

	if email == "" {
		ctx.JSON(http.StatusUnauthorized, gin.H{"err": "kakao signin error"})
		return
	}
	args := map[string]interface{}{
		"email": email,
	}

	/* 02. 추출한 email로 MongoDB에서 조회 */
	res, err := rsv.signinService.FindByEmail(args)

	if res.Email != "" { /* 02-01. 조회 된 경우*/

		// 자체 토큰 발행
		if token := rsv.jwtService.GenerateToken(res.Email, true); token != "" {
			// cookie 저장 방식
			ctx.SetCookie("crispy-token", token, 60*60*24, "/", conf.TokenURL, false, true)
			ctx.JSON(http.StatusOK, gin.H{"cookieSetting": true})
		} else {
			// 로그인 에러
			ctx.JSON(http.StatusUnauthorized, gin.H{"err": err.Error()})
		}
	} else { /* 02-02. 조회되지 않은 경우*/
		ctx.JSON(http.StatusUnauthorized, gin.H{"err": err.Error()})
	}

}
