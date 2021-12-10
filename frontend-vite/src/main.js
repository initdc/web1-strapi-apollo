import { createApp } from 'vue'
import { ApolloClient, InMemoryCache } from '@apollo/client/core'
import { createApolloProvider } from '@vue/apollo-option'
import Index from './pages/Index.vue'

const cache = new InMemoryCache()
const apolloClient = new ApolloClient({
  cache,
  uri: 'http://localhost:1337/graphql',
})
const apolloProvider = createApolloProvider({
  defaultClient: apolloClient,
})

createApp(Index)
  .use(apolloProvider)
  .mount('#app')

// import './assets/css/tailwind.css'
