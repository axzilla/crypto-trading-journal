function getReturnTotal(
  avgEntry: number,
  avgExit: number,
  side: string,
  orders: {
    _id: string
    side: string
    date: Date
    price: number
    quantity: number
  }[]
): number {
  if (side === 'Long') {
    return (
      (avgExit - avgEntry) *
      orders
        .filter(order => order.side === 'Short')
        .reduce((total, value) => {
          return total + value.quantity
        }, 0)
    )
  }

  if (side === 'Short') {
    return (
      (avgEntry - avgExit) *
      orders
        .filter(order => order.side === 'Long')
        .reduce((total, value) => {
          return total + value.quantity
        }, 0)
    )
  }
}

export default getReturnTotal
