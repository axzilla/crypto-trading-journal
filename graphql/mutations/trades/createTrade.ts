const createTrade = /* GraphQL */ `
  mutation createTrade(
    # Trade
    $symbol: String!
    $exchange: String!
    $quantity_total: String!
    $quantity_open: String!
    $cost: String!
    $avg_entry: String!
    # Initial order
    $date: String!
    $price: String!
    $quantity: String!
    # Trade & initial order
    $user_id: String!
    $side: String!
  ) {
    createTrade(
      # Trade
      symbol: $symbol
      exchange: $exchange
      quantity_total: $quantity_total
      quantity_open: $quantity_open
      cost: $cost
      avg_entry: $avg_entry
      # Initial order
      date: $date
      price: $price
      quantity: $quantity
      # Trade & initial order
      user_id: $user_id
      side: $side
    ) {
      id
    }
  }
`

export default createTrade
