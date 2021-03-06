# Blog
Crispy's Blog

React and Go with Uncle Bob's Clean-Architecture

https://crispyblog.kr/

## Project Stack

### frontend (client)
- React
- React Router
- Redux
- GraphQL (Apollo)
- JavaScript β TypeScript
- styled components & material-ui
- Remark (react-markdown / react-simlemde-editor)


### backend (server)
- Go Lang : Gin Framework & CleanArchitecture
- MongoDB ~~Mysql / GORM~~
- GraphQL
- JWT / GSMTP / Kakao API

### CI/CD
- Jenkins
- Docker
- NginX

### Enviroment Change
- router.go / dbConfig.go / config.go
- AddressConstant.tsx

## Version History
<details> 
    <summary> π Click Me  ( Expand Detail Tag ) </summary>

### Blog (tag : v0.4.4.1)
- λ²κ·Έ μμ 
    - locale time λΉ λ¨λ¦° κ² μΆκ°
    - notification card css edit

### Blog (tag : v0.4.4)
- locale time μ μ©
    - UTC -> Asia/Seoul

### Blog (tag : v0.4.3)
- adming λκΈ μλ¦Ό μΆκ°(refactoring νμ: presentation, container λΆλ¦¬ ν header μμμμ λ°μ΄ν° μ λ¬ νμ -> κ±΄μ μΉ΄μ΄νΈμ refetch λ±λ±...)

### Blog (tag : v0.4.2)
- admin λκΈ μλ¦Ό μΆκ° (λ―Έμμ±)

### Blog (tag : v0.4.1)
- crypto μ νΈ μΆκ°

### Blog (tag : v0.4)
- TypeScript λ‘ 1μ°¨ λ§μ΄κ·Έλ μ΄μ μλ£
    - any λ‘ Type Assertion λ μ½λλ κ°μ μ΄ νμ
    - μΌλΆμ½λ μ λ€λ¦­μΌλ‘ λμ²΄ νμ 

### Blog (tag : v0.3.8.1)
- TypeScript μ νμ  λ§μ§λ§ μ»€λ°
    - AS-IS : JavaSript
    - TO-BE : TypeScript

### Blog (tag : v0.3.8)
- HTTPS λ‘ μ ν
    - SSL μΈμ¦ : let's encrypt
    - nginx μ€μ νμΌ(blog.conf) μμ 

### Blog (tag : v0.3.7.3)
- NginX μ€μ  λ³κ²½
    - IP μ£Όμλ‘μ μ κ·Ό μ°¨λ¨

### Blog (tag : v0.3.7.2)
- GSMTP
    - server μμλ μΌλ° ν¨μ€μλλ‘λ μ κ·Ό μλ¬κ° λ°μνλ€.
    - 2λ¨κ³ μΈμ¦μ νμ±ν ν ν, μ± λΉλ°λ²νΈλ₯Ό λ°κΈλ°μ μ¬μ©ν΄μΌνλ€.

### Blog (tag : v0.3.7.1)
- Edit CSS
    - figure

### Blog (tag : v0.3.7)
- Edit Publisher
    - Thumbnail λ³κ²½μ΄ μμ μ, Thumbnail μλ‘λλ ν¨μ€νλ€.

### Blog (tag : v0.3.6.1)
- Edit CSS

### Blog (tag : v0.3.6)
- Add Markdown Plugins
    - remark-slug : μ¬λ¬κ·Έ
    - remark-footnotes : κ°μ£Ό

### Blog (tag : v0.3.5)
- CI/CD
    - jenkins
        - μλ²μ΄κ΄ μλ£ : μ μ¬μ μλ²μμμ λΉλλ₯Ό μν μ΅μ λͺ¨λ μ κ±°
    - docker
        - scratch λΉλ μ¬μ© X, λ‘κ·ΈμΈ μ΄μ ν΄κ²°

### Blog (tag : v0.3.4)
- CI/CD
    - jenkins
        - μλ²μ¬μμΌλ‘ μΈν΄ λΉλκ° λλ¬΄ μ€λ κ±Έλ¦Ό
        - μλ²μκ·Έλ μ΄λ κΉμ§λ μΌλ¨ λμ»€ μμμ : λ‘μ»¬PCμμ λΉλ -> docker-hub push -> serverμμ pull
    - docker
        - server λμ»€λ‘ κ΅¬λμ, kakao λ‘κ·ΈμΈ λ¬Έμ  λ°μ

### Blog (tag : v0.3.3.3)
- header λ²κ·Έ μμ 

### Blog (tag : v0.3.3.2)
- Edit Metatag
- Add secret page

### Blog (tag : v0.3.3.1)
- Edit CSS

### Blog (tag : v0.3.3)
- SEO
    - search console
        - sitemap.xml 
        - robots.txt
    - meta tag
        - react-helmet-async
    - pre-render
        - κ΅¬κΈλ΄μ JSκΉμ§ λ λλ§νμ¬ ν¬λ‘€λ§νλλ‘ μκ·Έλ μ΄λ λμλ€. μ΄μ λ κ΅³μ΄ pre-render κ° νμμλ κ²μΌλ‘ λ³΄μΈλ€.
        - Static Generation : μ μ μμ±
            - μ μ  λΌμ°νμ λν μ²λ¦¬ : λΉλμμ μ λͺμν url ν¬λ‘€λ§ β νμ΄μ§λ³ index.html μμ±
            - λμ  λΌμ°ν°μ λν μ²λ¦¬ : μΉν©κΈ°λ°μΌλ‘ λΉλμμ μ λμ νμ΄μ§λ€μ λ‘λ β ν¬λ‘€λ§ β index.html μμ± β url λ§€ν νμ (simple is best μμ λ²μ΄λλ―λ‘ λ°°μ νμλ€)
            - react-snap / prerender-spa-plugin
        - Server Side Rendering : μλ² μ¬μ΄λ λ λλ§
            - Next.js or Gatsby : server λ₯Ό Goλ‘ κ΅¬μΆ νμκΈ°μ λ°°μ νμλ€.

### Blog (tag : v0.3.2.1)
- λλ©μΈ λ±λ‘
    -  ddns: noip β dns: κ°λΉμ

### Blog (tag : v0.3.2)
- Edit CSS
- Change Logo & Favicon
- Add URL Constant

### Blog (tag : v0.3.1)
- μμλ°°ν¬(naver cloud)
    - docker
    - nginx
    - go cross os build

### Blog (tag : v0.3.0)
- κ²μ κΈ°λ₯ λ³΄μ
    - transitionμ λμμ μν΄ css μμ 
        - display: none β visiblity : hidden
    - νκ·Έ μλμλ ₯
    - Apllo Issue : [ObservableQuery with this id doesn't exist: id](https://github.com/apollographql/apollo-client/issues/4114)

### Blog (tag : v0.2.9)
- κ²μ κΈ°λ₯ κ΅¬ν
    - Apllo Issue : [ObservableQuery with this id doesn't exist: id](https://github.com/apollographql/apollo-client/issues/4114)

### Blog (tag : v0.2.8)
- Infinite Scroll(NewstViewer) : cursor λ°©μμΌλ‘ λ³κ²½
    - νΉμ  μν©μ μ μΈνκ³ μλ cursor λ°©μμ paginationμ μ¬μ©νλ κ²μ΄ λ°λμ§νλ€.

### Blog (tag : v0.2.7)
- CORS Middleware : dropzone initial file λ¬Έμ λ‘ default κ° μ€μ 
- Infinite Scroll(NewstViewer) : offset λ°©μ


### Blog (tag : v0.2.6)
- component λΆλ¦¬
    - container components
    - presentational components
- μ μ₯μ μ΄λ¦ λ³κ²½
    - gin-web β Blog

### Blog (tag : v0.2.5)
- Multiple CORS
- kakao login κ΅¬ν
    - server side working : kakaoAPI / JWT / SMPT
- λκΈ κ΅¬ν
    - refetch : cache-first (cache-and-network μΌλ‘ λμμ, μ μ²΄λ λλ§μ΄ μΌμ΄λλ€)
- Add detail to style


### Blog (tag : v0.2.4)
- Markdown
    - edit / delete κΈ°λ₯ κ΅¬ν
    - MDWriter : editMode μ writeMode λ‘ λΆλ₯
    
### Blog (tag : v0.2.3)
- privacy setting switch
    - public / private
    - apollo useQuery option : fetchPolicy
        - β cache-first (default)
        - cache-only
        - β cache-and-network
        - network-only
        - no-cache
        - standby
- Email Sign In κ΅¬ν
    - useLazyQuery
    - SMTP / JWT
    - β Graphql μμμ μ κ·Ό μ ν β
    ```palin
    1) Apollo Client : credentials: 'include' μ΅μμΌλ‘ CORS μμλ HttpOnly Cookieλ₯Ό μ μ‘κ°λ₯νκ² μ€μ νλ€.
    2) CORSMiddleware : μκΈ° μ€μ μΌλ‘ λ μ΄μ  Header μ Access-Control-Allow-Origin μ΅μμ μμΌλμΉ΄λ(*)λ‘ μ¬μ©ν΄μλ μλλ€.
    3) schemaμ  Resolve μ λ§€νλ Resolver λ μ€μ§ ResolveParams λ§μ νλΌλ―Έν°λ‘ λ°μ μ μκΈ°μ,  μ§μ μ μΌλ‘ gin.context λ₯Ό λκΈ°μ§ λͺ»νλ€.
    μ¦, cookie resolver νμ λ‘μ§μμ cookie μ¬μ©μ΄ λΆκ°νλ€.
    μ΄λ₯Ό μν΄, graphql.ResolveParams μ context λ‘ Srtuctλ₯Ό λκ²¨μ£Όλ CookieMiddleware λ₯Ό κ΅¬ννμλ€.
    ```
- Admin state
    - Current User λ₯Ό cookie ν ν°μΌλ‘ νμΈνμ¬, admin μ¬λΆλ₯Ό νλ³νλ€.
    - admin μΈ κ²½μ°μλ§, κΈμ°κΈ° λ° κ΄λ ¨ λ©λ΄κ° νμ±ν λλ€.
- definition tip
    - Authentication(authenticate) = login + password (who you are)
    - Authorization(authorize) = permissions (what you are allowed to do)

### Blog (tag : v0.2.2)
- Post(article) and MDE
    - article max-width λμ  CSS μ μ©
    - post validation
    - publish dialog : thumbnail upload / μκ° / κ³΅κ°, λΉκ³΅κ°
    - mde resize image helper μΆκ°
    - card css μμ 

### Blog (tag : v0.2.1)
- Markdown : server image upload κ΅¬ν

### Blog (tag : v0.2.0)
- client :
    - router page κ΅¬μ‘° λ³κ²½/ header subject λμ κ°μ  / λ²κ·Έ μμ 
    - MarkDown
        - editor : react-simplemde-editor
        - renderer : react-markdown
            - remark-gfm / rehype-raw /SyntaxHighlighter / style μ μ
    - snackbar κ΅¬ν : notistack
    
- server :
    - MongoDB id λμ  _id μ¬μ©
    - sequence κ΅¬ν
        1. create sequence collection
        2. auto increament 
        3. type : int64 / NumberLong()
        4. findOneAndUpdate, findOneAndReplace β ~~findAndModify~~

### Blog (tag : v0.1.9)
- testData λμ  λͺ¨λ MongoDB λ°μ΄ν°λ‘ λ³κ²½

### Blog (tag : v0.1.8)
- server : CORS Middleware μμ±
- client : yarn add apollo-boost graphgql @react-apollo
    - Menu - server data load

### Blog (tag : v0.1.7)
- server
    - AS-IS : Mysql / RESTful
    - TO-BE : MongoDB / GraphQL
- GraphQL
    - graphql : ggithub.com/graphql-go/graphql
    - graphql hadnler : gogithub.com/graphql-go/handler
    - ~~gqlgen : github.com/99designs/gqlgen~~
        - gqlgen μ schema λ§μΌλ‘ generated μμμ μνν΄μ£Όμ΄ λ§€μ° νΈλ¦¬νλ€.
        - λ€λ§, λμ λͺ©μ μ λΆν©νμ§ μμλ€. μ ν΄μ§ κ·κ²©μ΄ μμ΄μ μ€νλ € μ»€μ€ννλλ° λΉμ©μ΄ μλΉλλ€.
    - cleanArchitecutre
        - repository - service - resolver  - schema - gql handler κ΅¬μ‘°
    - bson
        - bson.D / bson.M / bson.E / bson.A

    ```plain
    [or search]
    data, err := r.db.Find(context.TODO(), bson.M{"$or": []bson.M{{"title": title}, {"id": id}}})
    
    [like search]
    data, err := r.db.Find(context.TODO(), bson.M{"title": bson.M{"$regex": title}})

    [like search + λμλ¬Έμ κ΅¬λΆ X]
    data, err := r.db.Find(context.TODO(), bson.M{"title": bson.M{"$regex": title, "$options": "i"}})

    ```

### Blog (tag : v0.1.6)
- server : db connection λ°©μ λ³κ²½
    - The connection is only done once

### Blog (tag : v0.1.5)
- VanillaJS μ½λλ₯Ό React-Router-dom Hook μΌλ‘ λμ²΄
    - page - container - component μ°κ²°

### Blog (tag : v0.1.4)
- SpeedDialog μΆκ°

### Blog (tag : v0.1.3)
- header subject λμ κ°μ 
- useEffect(componentWillUnmount) μμμ removeEventListener
- catching bug O_O

### Blog (tag : v0.1.2)
- Hook μΌλ‘ λμ²΄
    - connect -> useSelector, useDispatch
    - store.subscribe -> useEffect
- Hook μ΅μ ν
    - useSelector
        - a) λλ¦½ μ μΈ
        - b) shallowEqual
    - useEffect
        - μμ‘΄μ±λ°°μ΄μμ΄ componentDidMount μ²λΌ λμ νκΈ°μν λ³μ(κ½μ?) μΆκ°

### Blog (tag : v0.1.1)
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

### Blog (tag : v0.1.0)
- router λ° SideBar μΆκ° μμ

### Blog (tag : v0.0.9)
- redux λ° sidebar hidden/expand μμ

### Blog (tag : v0.0.8)
- λΈλ‘κ·Έλ‘ μ»¨μ λ³κ²½
    - λΌλ μμ±
    - styled component κΈ°λ°μ μ½κ°μ material-ui λ₯Ό κ³λ€μΈ...

### Blog (tag : v0.0.7.2)
- Using yarn instead of npm

    ![ex_screenshot](./server/docs/react_structure.PNG)

### Blog (tag : v0.0.7.1)
- Refactoring : Folder Structure

### Blog (tag : v0.0.7)
- kakao api Login κ΅¬ν
    - kakao ν ν° λ°κΈνμΈ ν, μμ²΄ JWT λ‘κ·ΈμΈ μ§ν
- Logout κ΅¬ν

### Blog (tag : v0.0.6)
- λ‘κ·ΈμΈ κΈ°λ₯ κ΅¬ν μλ£
    - signup ν email μΈμ¦ (google uuidλ₯Ό μΈμ¦ν€κ°μΌλ‘ μ¬μ©)

### Blog (tag : v0.0.5)
- JWTμ ν΅ν λ‘κ·ΈμΈ μ μ©
    - http only Cookie
    - *CSRF Defence λμ± νμ*

### Blog (tag : v0.0.4)
- CleanArchitecutre μ μ©
- DB μ°λ
    - gorm / mysql / read config env
    - *gorm μ TableName λ©μλκ° νμμ΄μμΌλ‘ μ¬λ¬λ² νΈμΆλλ λ¬Έμ λ₯Ό λ³΄μ*

### Blog (tag : v0.0.3)
- CleanArchitecture λ‘ λ³κ²½μ€
- ajax λ‘ λμνλ article μ κ±°λ²νΌ μΆκ°

### Blog (tag : v0.0.2)
- requestμ accept header λ³λ‘ μ²λ¦¬ν΄μ€ redner ν¨μ μΆκ°
- middleware λλ ν λ¦¬ μμ± ( gin.Default() μμ gin.New() λ‘ λ³κ²½ )
    - Logging μΆκ°
    - basic auth μΆκ°
    - ~~req/res λλ²κΉμ μν gindump μΆκ°~~

### Blog (tag : v0.0.1)
- κ° μΈλ‘ μ¬μ λ΄μ€κΈ°μ¬λ₯Ό μ€ν¬λ©νμ¬, μνλ ν€μλλ³λ‘ μ λ¦¬ν΄μ λ³΄μ¬μ£Όλ website κ³ν
    - νλμ ν€μλμ λνμ¬ μ¬λ¬ μΈλ‘ μ¬μ κΈ°μ¬λ₯Ό λΉκ΅νμ¬ λ³Όμ μλ€.
- directorty  μ¬κ΅¬μ±
    - router / controller / service / model
    - main router μμ κ° router groupμ init νλλ‘ κ΅¬μ±
    
    ![ex_screenshot](./server/docs/dir_remake.png)

## initial commit
- directory structure μμ μμ±

    ![ex_screenshot](./server/docs/directory.png)

</details>