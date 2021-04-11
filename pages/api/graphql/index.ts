// Packages
import { ApolloServer } from 'apollo-server-micro'

// DB
import db from '../../../knex'

// TypeDefs
import typeDefs from './typeDefs'

// Controller
import {
  getTradesByUserId,
  getTradeByTradeId,
  createTrade,
  updateTrade,
  deleteTrade
} from 'controller/trades'
import {
  getOrdersByTradeId,
  getOrdersByUserId,
  createOrder,
  updateOrder,
  deleteOrder
} from 'controller/orders'

const resolvers = {
  Query: {
    // trades
    tradesByUserId: async (_, { user_id }: never) => getTradesByUserId(user_id),
    tradeByTradeId: (_, { id }: never) => getTradeByTradeId(id),
    // orders
    ordersByTradeId: async (_, { trade_id }: never) => getOrdersByTradeId(trade_id),
    ordersByUserId: async (_, { user_id }: never) => getOrdersByUserId(user_id)
  },
  Mutation: {
    // trades
    createTrade: async (_, data) => createTrade(data),
    updateTrade: async (_, data) => updateTrade(data),
    deleteTrade: async (_, { id }) => deleteTrade(id),
    // orders
    createOrder: async (_, data) => createOrder(data),
    updateOrder: async (_, data) => updateOrder(data),
    deleteOrder: async (_, { id }) => deleteOrder(id)
  }
}

const apolloServer = new ApolloServer({ typeDefs, resolvers, context: () => db })
export const config = { api: { bodyParser: false } }

export default apolloServer.createHandler({ path: '/api/graphql' })
