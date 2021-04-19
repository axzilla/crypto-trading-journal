function getFees(
  orders: {
    _id: string
    side: string
    date: Date
    price: number
    quantity: number
    fees: number
  }[]
): number {
  return orders.reduce((total, value) => {
    return total + value.fees
  }, 0)
}

export default getFees
