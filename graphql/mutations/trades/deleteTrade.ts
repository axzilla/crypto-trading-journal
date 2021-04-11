const deleteTrade = /* GraphQL */ `
  mutation deleteTrade($id: String!) {
    deleteTrade(id: $id) {
      id
    }
  }
`

export default deleteTrade
