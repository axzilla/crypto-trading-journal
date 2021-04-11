const tradeQueries = /* GraphQL */ `
  type Query {
    ordersByTradeId(trade_id: String!): [Order!]!
    ordersByUserId(user_id: String!): [Order!]!
  }
`

export default tradeQueries
