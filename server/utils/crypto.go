package utils

import (
	"crypto/sha512"
	"encoding/base64"
)

// SHA512 해쉬값 생성 후, base64로 변환한다
func Encrypt(data string) string {
	sha := sha512.New()                                     // SHA512 해시 인스턴스 생성
	sha.Write([]byte(data))                                 // 해시 인스턴스에 데이터 추가
	hashValue := sha.Sum(nil)                               // 해시 인스턴스에 저장된 데이터의 SHA512 해시 값 추출
	dataEnc := base64.StdEncoding.EncodeToString(hashValue) //base64 로 변환
	return dataEnc
}
