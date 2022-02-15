import {
    ApolloClient,
    InMemoryCache,
    createHttpLink
} from "@apollo/client";
import { setContext } from '@apollo/client/link/context';
import { storedCredentials } from "../utils";

const uri = process.env.NODE_ENV === 'development' ? 'http://localhost:4000/' : 'https://taptoe-gapi.herokuapp.com/';

const httpLink = createHttpLink({
    uri
});

const authLink = setContext((_, { headers }) => {
    // get the authentication token from local storage if it exists
    const creds = storedCredentials()
    // return the headers to the context so httpLink can read them
    return {
      headers: {
        ...headers,
        authorization: creds?.token ? `Bearer ${creds.token}` : "",
      }
    }
});
  
const client = new ApolloClient({
    link: authLink.concat(httpLink),
    // uri,
    cache: new InMemoryCache(),
    defaultOptions: {
      query: {
        fetchPolicy: "network-only",
      },
      mutate: {
        fetchPolicy: 'network-only'
      }
    }
});

export default client;