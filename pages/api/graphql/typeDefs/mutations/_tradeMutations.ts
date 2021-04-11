const tradeMutations = /* GraphQL */ `
  extend type Mutation {
    createTrade(
      # Trade
      exchange: String!
      symbol: String!
      quantity_total: String!
      quantity_open: String!
      cost: String!
      avg_entry: String!
      # Initial order
      date: String!
      price: String!
      quantity: String!
      # Trade & initial order
      user_id: String!
      side: String!
    ): Trade!

    updateTrade(id: String!): Trade!
    deleteTrade(id: String!): Trade!
  }
`

export default tradeMutations
