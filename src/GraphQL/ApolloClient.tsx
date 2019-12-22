import Constants from 'expo-constants';
import { InMemoryCache } from 'apollo-cache-inmemory';
import ApolloClient from 'apollo-client';
import { ApolloLink } from 'apollo-link';
import { setContext } from 'apollo-link-context';
import { onError } from 'apollo-link-error';
import { createHttpLink } from 'apollo-link-http';
import { AsyncStorage } from 'react-native';

const { NODE_ENV } = process.env;
console.log({ __DEV__, NODE_ENV });
const { devServerUrl, prodServerUrl, graphqlEndpoint } = Constants.manifest.extra;

const serverUrl = NODE_ENV === 'production' ? prodServerUrl : devServerUrl;

const httpLink = createHttpLink({
  uri: `${serverUrl}${graphqlEndpoint}`,
});

const authMiddleware = setContext(async (req, { headers }) => {
  // Get the authentication token from async storage if it exists
  const token = await AsyncStorage.getItem('x-auth-token');
  // Return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
      // cookie: null,
    },
  };
});

export const addErrorHandlers = (link) => ApolloLink.from([
  onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors) {
      graphQLErrors.forEach(({ message, locations, path }) => {
        console.log(`[GraphQL error]: Message: ${message}, Location: ${JSON.stringify(locations)}, Path: ${JSON.stringify(path)}`);
      });
    }
    if (networkError) console.log(`[Network error]: ${networkError}`);
  }),
  link,
]);

export const cache = new InMemoryCache({ dataIdFromObject: (o) => (o._id ? `${o.__typename}:${o._id}` : null) });

const client = new ApolloClient({
  link: addErrorHandlers(authMiddleware.concat(httpLink)),
  cache,
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
