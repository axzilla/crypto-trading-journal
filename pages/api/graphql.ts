// Packages
import { gql, ApolloServer } from 'apollo-server-micro'

import db from '../../knex/knex'

const typeDefs = gql`
  type Query {
    trades: [Trade!]!
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
  }

  type Trade {
    user: String!
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
`

const resolvers = {
  Query: {
    trades: () => {
      return db.select('*').from('trades')
    }
  },
  Mutation: {
    createTrade: async (
      parent,
      { user, symbol, exchange, action, date, price, quantity, fee, status }
    ) => {
      const createdTrade = await db('trades')
        .insert({ user, symbol, exchange, action, date, price, quantity, fee, status })
        .returning('*')
      return createdTrade[0]
    }
  }
}

const apolloServer = new ApolloServer({ typeDefs, resolvers, context: () => db })
export const config = { api: { bodyParser: false } }

export default apolloServer.createHandler({ path: '/api/graphql' })
