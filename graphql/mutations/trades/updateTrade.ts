const updateTrade = /* GraphQL */ `
  mutation updateTrade($id: String!) {
    updateTrade(id: $id) {
      id
    }
  }
`

export default updateTrade
