const orderType = /* GraphQL */ `
  type Trade {
    id: String!
    user_id: String!
    type: String!
    leverage: Float!
    exchange: String!
    symbol: String!
    side: String!
    quantity_total: String!
    quantity_open: String!
    cost: String!
    avg_entry: String!
    avg_exit: String!
    return_total: String!
    return_percent: String!
    status: String!
    created_at: String!
  }
`

export default orderType
