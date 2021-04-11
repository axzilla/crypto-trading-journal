const orderMutations = /* GraphQL */ `
  type Mutation {
    createOrder(
      user_id: String!
      trade_id: String!
      side: String!
      date: String!
      price: String!
      quantity: String!
    ): Order!

    updateOrder(
      id: String!
      side: String!
      date: String!
      price: String!
      quantity: String!
    ): Order!

    deleteOrder(id: String!): Order!
  }
`

export default orderMutations
