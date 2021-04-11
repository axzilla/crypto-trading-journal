const updateOrder = /* GraphQL */ `
  mutation updateOrder(
    $id: String!
    $side: String!
    $date: String!
    $price: String!
    $quantity: String!
  ) {
    updateOrder(id: $id, side: $side, date: $date, price: $price, quantity: $quantity) {
      id
      side
      date
      price
      quantity
    }
  }
`

export default updateOrder
