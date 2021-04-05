// Packages
import { gql, ApolloServer } from 'apollo-server-micro'

import db from '../../knex/knex'

const typeDefs = gql`
  type Trade {
    user: String!
    uuid: String!
    id: ID!
    symbol: String!
    exchange: String!
    action: String!
    date: String!
    price: String!
    quantity: String!
    fee: String!
    status: String!
    date_created: String!
  }

  type Query {
    tradesByUser(user: String!): [Trade!]!
  }

  type Mutation {
    createTrade(
      user: String!
      symbol: String!
      exchange: String!
      action: String!
      date: String!
      price: String!
      quantity: String!
      fee: String!
    ): Trade!

    deleteTrade(uuid: String!): Trade!
  }
`

const resolvers = {
  Query: {
    tradesByUser: (_: unknown, { user }: never) => {
      return db.select('*').from('trades').where({ user })
    }
  },
  Mutation: {
    createTrade: async (
      _: unknown,
      { user, symbol, exchange, action, date, price, quantity, fee, status }
    ) => {
      const createdTrade = await db('trades')
        .insert({ user, symbol, exchange, action, date, price, quantity, fee, status })
        .returning('*')
      return createdTrade[0]
    },
    deleteTrade: async (_, { uuid }) => {
      const createdTrade = await db('trades').where({ uuid }).del().returning('*')
      return createdTrade[0]
    }
  }
}

const apolloServer = new ApolloServer({ typeDefs, resolvers, context: () => db })
export const config = { api: { bodyParser: false } }

export default apolloServer.createHandler({ path: '/api/graphql' })
