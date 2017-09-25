import { createStore, applyMiddleware } from 'redux'
import { AsyncStorage } from 'react-native'
import { composeWithDevTools } from 'redux-devtools-extension'
import ApolloClient, { createNetworkInterface } from 'apollo-client'
import thunk from 'redux-thunk'
import {
  SubscriptionClient,
  addGraphQLSubscriptions,
} from 'subscriptions-transport-ws'

import reducers from './reducers'

const networkInterface = createNetworkInterface({
  uri: 'http://192.168.1.64:3000/graphql',
})

const wsClient = new SubscriptionClient(
  'ws://192.168.1.64:3000/subscriptions',
  {
    reconnect: true,
    connectionParams: {},
  }
)

networkInterface.use([
  {
    async applyMiddleware(req, next) {
      if (!req.options.headers) {
        req.options.headers = {}
      }
      try {
        const token = await AsyncStorage.getItem('@twitter-clone')
        if (token != null) {
          req.options.headers.authorization = `Bearer ${token}` || null
        }
      } catch (error) {
        throw error
      }

      return next()
    },
  },
])

const networkInterfaceWithSubs = addGraphQLSubscriptions(
  networkInterface,
  wsClient
)

export const client = new ApolloClient({
  networkInterface: networkInterfaceWithSubs,
})

const middlewares = [client.middleware(), thunk]

export const store = createStore(
  reducers(client),
  undefined,
  composeWithDevTools(applyMiddleware(...middlewares))
)
