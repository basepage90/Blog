# golang 이미지를 사용
FROM golang:1.16-alpine

# work dir
WORKDIR /home/blog/server

# host pc의 현재경로의 디렉토리를 workdir 의 디렉토리로 복사
COPY . .

# 5000 포트 오픈
EXPOSE 5000

RUN GOOS=linux GOARCH=amd64 go build -o main

CMD [ "./main" ]