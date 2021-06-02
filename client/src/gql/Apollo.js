import ApolloClient from "apollo-boost";

const client = new ApolloClient({
    uri: "http://wjk.ddns.net:5000/gql",
});

export default client;