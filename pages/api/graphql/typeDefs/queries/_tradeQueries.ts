const orderQueries = /* GraphQL */ `
  extend type Query {
    tradesByUserId(user_id: String!): [Trade!]!
    tradeByTradeId(id: String!): [Trade!]!
  }
`

export default orderQueries
