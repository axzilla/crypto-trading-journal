function getReturnTotal(
  avgEntry: number,
  avgExit: number,
  side: string,
  orders: [
    {
      id: string
      side: string
      date: Date
      price: string
      quantity: string
    }
  ]
): number {
  if (side === 'buy') {
    return (
      (avgExit - avgEntry) *
      orders
        .filter(order => order.side === 'sell')
        .reduce((total, value) => {
          return total + Number(value.quantity)
        }, 0)
    )
  }

  if (side === 'sell') {
    return (
      (avgEntry - avgExit) *
      orders
        .filter(order => order.side === 'buy')
        .reduce((total, value) => {
          return total + Number(value.quantity)
        }, 0)
    )
  }
}

export default getReturnTotal
