# Gin-Web
Crispy's Blog

React and Go with Clean-Architecture

## Project Stack

### frontend (client)
- React
- React Router
- Redux
- GraphQL (Apollo)
- styled components & material-ui

### backend (server)
- Go : Gin Framework with CleanArchitecture
- MongoDB ~~Mysql / GORM~~
- GraphQL
- JWT / SMTP

## Version History
<details> 
    <summary> 👉 Click Me  ( Expand Detail Tag ) </summary>

### Gin-Web (tag : v0.2.2)
- Post(article) and MDE
    - article max-width 동적 CSS 적용
    - post validation
    - publish dialog : thumbnail upload / 소개 / 공개, 비공개
    - mde resize image helper 추가
    - card css 수정

### Gin-Web (tag : v0.2.1)
- Markdown : server image upload 구현

### Gin-Web (tag : v0.2.0)
- client :
    - router page 구조 변경/ header subject 동작 개선 / 버그 수정
    - MarkDown
        - editor : react-simplemde-editor
        - renderer : react-markdown
            - remark-gfm / rehype-raw /SyntaxHighlighter / style 정의
    - snackbar 구현 : notistack
    
- server :
    - MongoDB id 대신 _id 사용
    - sequence 구현
        1. create sequence collection
        2. auto increament 
        3. type : int64 / NumberLong()
        4. findOneAndUpdate, findOneAndReplace ← ~~findAndModify~~

### Gin-Web (tag : v0.1.9)
- testData 대신 모두 MongoDB 데이터로 변경

### Gin-Web (tag : v0.1.8)
- server : CORS Middleware 생성
- client : yarn add apollo-boost graphgql @react-apollo
    - Menu - server data load

### Gin-Web (tag : v0.1.7)
- server
    - AS-IS : Mysql / RESTful
    - TO-BE : MongoDB / GraphQL
- GraphQL
    - graphql : ggithub.com/graphql-go/graphql
    - graphql hadnler : gogithub.com/graphql-go/handler
    - ~~gqlgen : github.com/99designs/gqlgen~~
        - gqlgen 은 schema 만으로 generated 작업을 수행해주어 매우 편리하다.
        - 다만, 나의 목적에 부합하지 않았다. 정해진 규격이 있어서 오히려 커스텀하는데 비용이 소비된다.
    - cleanArchitecutre
        - repository - service - resolver  - schema - gql handler 구조
    - bson
        - bson.D / bson.M / bson.E / bson.A

    ```plain
    [or search]
    data, err := r.db.Find(context.TODO(), bson.M{"$or": []bson.M{{"title": title}, {"id": id}}})
    
    [like search]
    data, err := r.db.Find(context.TODO(), bson.M{"title": bson.M{"$regex": title}})

    [like search + 대소문자 구분 X]
    data, err := r.db.Find(context.TODO(), bson.M{"title": bson.M{"$regex": title, "$options": "i"}})

    ```

### Gin-Web (tag : v0.1.6)
- server : db connection 방식 변경
    - The connection is only done once

### Gin-Web (tag : v0.1.5)
- VanillaJS 코드를 React-Router-dom Hook 으로 대체
    - page - container - component 연결

### Gin-Web (tag : v0.1.4)
- SpeedDialog 추가

### Gin-Web (tag : v0.1.3)
- header subject 동작 개선
- useEffect(componentWillUnmount) 에서의 removeEventListener
- catching bug O_O

### Gin-Web (tag : v0.1.2)
- Hook 으로 대체
    - connect -> useSelector, useDispatch
    - store.subscribe -> useEffect
- Hook 최적화
    - useSelector
        - a) 독립 선언
        - b) shallowEqual
    - useEffect
        - 의존성배열없이 componentDidMount 처럼 동작 하기위한 변수(꽁수?) 추가

### Gin-Web (tag : v0.1.1)
- useEffect expression
```plain
    - componentDidMount
        useEffect(() => {
            do();
         }, []);

    - componentDidUpdate
         useEffect(() => {
            do();
         }, [state]);

    - componentWillUnmount 
        useEffect(() => {
            do();
            return () => {
                finish();
            }
         });
```

### Gin-Web (tag : v0.1.0)
- router 및 SideBar 추가 작업

### Gin-Web (tag : v0.0.9)
- redux 및 sidebar hidden/expand 작업

### Gin-Web (tag : v0.0.8)
- 블로그로 컨셉 변경
    - 뼈대 생성
    - styled component 기반에 약간의 material-ui 를 곁들인...

### Gin-Web (tag : v0.0.7.2)
- Using yarn instead of npm

    ![ex_screenshot](./server/docs/react_structure.PNG)

### Gin-Web (tag : v0.0.7.1)
- Refactoring : Folder Structure

### Gin-Web (tag : v0.0.7)
- kakao api Login 구현
    - kakao 토큰 발급확인 후, 자체 JWT 로그인 진행
- Logout 구현

### Gin-Web (tag : v0.0.6)
- 로그인 기능 구현 완료
    - signup 후 email 인증 (google uuid를 인증키값으로 사용)

### Gin-Web (tag : v0.0.5)
- JWT을 통한 로그인 적용
    - http only Cookie
    - *CSRF Defence 대책 필요*

### Gin-Web (tag : v0.0.4)
- CleanArchitecutre 적용
- DB 연동
    - gorm / mysql / read config env
    - *gorm 의 TableName 메서드가 필요이상으로 여러번 호출되는 문제를 보임*

### Gin-Web (tag : v0.0.3)
- CleanArchitecture 로 변경중
- ajax 로 동작하는 article 제거버튼 추가

### Gin-Web (tag : v0.0.2)
- request의 accept header 별로 처리해줄 redner 함수 추가
- middleware 디렉토리 생성 ( gin.Default() 에서 gin.New() 로 변경 )
    - Logging 추가
    - basic auth 추가
    - ~~req/res 디버깅을 위한 gindump 추가~~

### Gin-Web (tag : v0.0.1)
- 각 언론사의 뉴스기사를 스크랩하여, 원하는 키워드별로 정리해서 보여주는 website 계획
    - 하나의 키워드에 대하여 여러 언론사의 기사를 비교하여 볼수 있다.
- directorty  재구성
    - router / controller / service / model
    - main router 에서 각 router group을 init 하도록 구성
    
    ![ex_screenshot](./server/docs/dir_remake.png)

## initial commit
- directory structure 임시 생성

    ![ex_screenshot](./server/docs/directory.png)

</details>