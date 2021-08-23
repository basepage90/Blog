## multi stage build

# golang 이미지를 사용
FROM golang:1.16-alpine as builder

# work dir
WORKDIR /home/blog/server

# host pc의 현재경로의 디렉토리를 workdir 의 디렉토리로 복사
COPY . .

# 5000 포트 오픈
EXPOSE 5000

RUN CGO_ENABLED=0 GOOS=linux GOARCH=amd64 go build -a -ldflags '-s' -o main

### Make executable image : 경량화
FROM scratch

WORKDIR /home/blog/server

COPY --from=builder /home/blog/server/main /home/blog/server/main

COPY --from=builder /home/blog/server/conf /home/blog/server/conf

COPY --from=builder /home/blog/server/static /home/blog/server/static

CMD [ "./main" ]