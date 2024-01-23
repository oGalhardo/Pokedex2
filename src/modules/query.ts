import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client/core'
import { createApolloProvider } from '@vue/apollo-option'
const httpLink = new HttpLink({
  uri: 'http://localhost:4000/'
})

export const apolloClient = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
  connectToDevTools: true
})

export const apolloProvider = createApolloProvider({
  defaultClient: apolloClient
})
