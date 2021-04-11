const tradesAndOrdersByUser = /* GraphQL */ `
  query tradesByUserId($user_id: String!) {
    tradesByUserId(user_id: $user_id) {
      id
      user_id
      symbol
      exchange
      side
      quantity_total
      quantity_open
      cost
      avg_entry
      avg_exit
      return_total
      return_percent
      status
      created_at
    }
  }
`

export default tradesAndOrdersByUser
