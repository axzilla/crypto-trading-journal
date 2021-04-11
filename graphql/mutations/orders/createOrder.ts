const createOrder = /* GraphQL */ `
  mutation createOrder(
    $user_id: String!
    $trade_id: String!
    $side: String!
    $date: String!
    $price: String!
    $quantity: String!
  ) {
    createOrder(
      user_id: $user_id
      trade_id: $trade_id
      side: $side
      date: $date
      price: $price
      quantity: $quantity
    ) {
      id
      user_id
      trade_id
      side
      date
      price
      quantity
    }
  }
`

export default createOrder
