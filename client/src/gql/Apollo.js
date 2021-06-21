import ApolloClient from "apollo-boost";


const client = new ApolloClient({
    uri: "http://wjk.ddns.net:5000/gql",
    credentials: 'include',
    // cors 상황에서도 cookie(특히 httponly cookie)를 사용하기 위한 옵션이다.
    // ( 그러나 정작 go server의 resolver에서 받을 방법이 찾지못한는중...)
    
    // headers: {authorization:  token === undefined ? "" : token},
});

export default client;