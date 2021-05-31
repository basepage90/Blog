import ApolloClient from "apollo-boost";

const client = new ApolloClient({
    uri: "http://localhost:8080/gql",
});


export default client;