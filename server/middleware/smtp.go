package middleware

import (
	"net/smtp"

	"github.com/joho/godotenv"
	"github.com/jordan-wright/email"
	"github.com/woojebiz/gin-web/server/models"
)

var smtpConfig, _ = godotenv.Read("./conf/smtpConfig.env")

func SendCertiMail(user models.User) error {
	certiTag := "<a href=\"http://wjk.ddns.net:8080/login/certi/" + user.Uuid + "\"> Click Me !</a>"

	e := email.NewEmail()
	e.From = "<basepage79@gmail.com>"
	e.To = []string{user.Email}
	// e.Bcc = []string{"test_bcc@example.com"}
	// e.Cc = []string{"test_cc@example.com"}
	e.Subject = "Test mail send"
	// e.Text = []byte("Text Body is, of course, supported!")
	e.HTML = []byte("<h1>회원가입을 축하드립니다. 아래 링크를 클릭하시면,  '이메일 인증'이 완료됩니다.</h1>" + certiTag + " ")

	return e.Send("smtp.gmail.com:587", smtp.PlainAuth("", smtpConfig["SMTP_ACC"], smtpConfig["SMTP_PWD"], "smtp.gmail.com"))

}
