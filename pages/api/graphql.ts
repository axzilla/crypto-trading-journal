// Packages
import { gql, ApolloServer } from 'apollo-server-micro'

import db from '../../knex/knex'

const typeDefs = gql`
  type Trade {
    user_id: String!
    id: String!
    symbol: String!
    exchange: String!
    status: String!
    created_at: String!
  }

  type Order {
    user_id: String!
    trade_id: String!
    id: String!
    action: String!
    date: String!
    price: String!
    quantity: String!
    fee: String!
    created_at: String!
  }

  type Query {
    tradesByUserId(user_id: String!): [Trade!]!
    tradeByTradeId(id: String!): [Trade!]!
    ordersByTradeId(trade_id: String!): [Order!]!
    ordersByUserId(user_id: String!): [Order!]!
  }

  type Mutation {
    createTrade(
      user_id: String!
      exchange: String!
      symbol: String!
      action: String!
      date: String!
      price: String!
      quantity: String!
      fee: String!
    ): Trade!

    deleteTrade(id: String!): Trade!

    createOrder(
      user_id: String!
      trade_id: String!
      action: String!
      date: String!
      price: String!
      quantity: String!
      fee: String!
    ): Order!

    updateOrder(
      id: String!
      action: String!
      date: String!
      price: String!
      quantity: String!
      fee: String!
    ): Order!

    deleteOrder(id: String!): Order!
  }
`

const resolvers = {
  Query: {
    tradesByUserId: async (_: unknown, { user_id }: never) => {
      return db.select('*').from('trades').where({ user_id })
    },
    tradeByTradeId: (_: unknown, { id }: never) => {
      return db.select('*').from('trades').where({ id })
    },
    ordersByTradeId: async (_: unknown, { trade_id }: never) => {
      return await db.select('*').from('orders').where({ trade_id })
    },
    ordersByUserId: async (_: unknown, { user_id }: never) => {
      return await db.select('*').from('orders').where({ user_id })
    }
  },
  Mutation: {
    createTrade: async (
      _: unknown,
      { user_id, symbol, exchange, action, date, price, quantity, fee, status }
    ) =>
      // { user_id, symbol, exchange, status }
      {
        const createdTrade = await db('trades')
          .insert({ user_id, exchange, symbol, status })
          .returning('*')

        await db('orders')
          .insert({ user_id, trade_id: createdTrade[0].id, action, date, price, quantity, fee })
          .returning('*')

        return createdTrade[0]
      },
    deleteTrade: async (_, { id }) => {
      const createdTrade = await db('trades').where({ id }).del().returning('*')
      return createdTrade[0]
    },
    createOrder: async (_: unknown, { user_id, trade_id, action, date, price, quantity, fee }) => {
      const createdOrder = await db('orders')
        .insert({ user_id, trade_id, action, date, price, quantity, fee })
        .returning('*')
      return createdOrder[0]
    },
    updateOrder: async (_, { id, action, date, price, quantity, fee }) => {
      const updatedTrade = await db('orders')
        .where({ id })
        .update({ action, date, price, quantity, fee })
        .returning('*')
      return updatedTrade[0]
    },
    deleteOrder: async (_, { id }) => {
      const createdTrade = await db('orders').where({ id }).del().returning('*')
      return createdTrade[0]
    }
  }
}

const apolloServer = new ApolloServer({ typeDefs, resolvers, context: () => db })
export const config = { api: { bodyParser: false } }

export default apolloServer.createHandler({ path: '/api/graphql' })
