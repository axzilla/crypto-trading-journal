const tradeAndOrdersByTradeId = /* GraphQL */ `
  query tradeAndOrdersByTradeId($trade_id: String!) {
    tradeByTradeId(id: $trade_id) {
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
    ordersByTradeId(trade_id: $trade_id) {
      id
      user_id
      trade_id
      side
      date
      price
      quantity
      created_at
    }
  }
`

export default tradeAndOrdersByTradeId
