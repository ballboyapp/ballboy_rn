import { InMemoryCache } from 'apollo-cache-inmemory';
import ApolloClient from 'apollo-client';
import { ApolloLink } from 'apollo-link';
import { setContext } from 'apollo-link-context';
import { onError } from 'apollo-link-error';
import { HttpLink } from 'apollo-link-http';
import { AsyncStorage } from 'react-native';
import config from '../config';
import SeedorfAPI from '../Services/SeedorfApi';

const httpLink = new HttpLink({ uri: config.seedorfGraphQLUrl });

const authMiddleware = setContext(async (req, { headers }) => {
  // Get the authentication token from async storage if it exists
  const token = await AsyncStorage.getItem('TOKEN');
  // Make sure REST auth header is set when app init
  SeedorfAPI.setToken(token);
  // Return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `JWT ${token}` : null,
      cookie: null,
    },
  };
});

// TODO: export and import in ApolloMockClient.js
const addErrorHandlers = link => ApolloLink.from([
  onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors) {
      graphQLErrors.forEach(({ message, locations, path }) => {
        console.log(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`);
      });
    }
    if (networkError) console.log(`[Network error]: ${networkError}`);
  }),
  link,
]);

const client = new ApolloClient({
  link: addErrorHandlers(authMiddleware.concat(httpLink)),
  cache: new InMemoryCache({ dataIdFromObject: object => object.uuid || null }),
});

export default client;


// export const createClient = (uri) => {
//   let token = null;
//   const middlewareLink = new ApolloLink((operation, forward) => {
//     if (config.logGraphQLQueries) console.log(operation);
//     operation.setContext({
//       headers: {
//         authorization: token ? `JWT ${token}` : null,
//         cookie: null,
//       },
//     });
//     return forward(operation);
//   });
