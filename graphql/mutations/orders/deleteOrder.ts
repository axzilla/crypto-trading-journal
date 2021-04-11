const deleteOrder = /* GraphQL */ `
  mutation deleteOrder($id: String!) {
    deleteOrder(id: $id) {
      id
    }
  }
`

export default deleteOrder
