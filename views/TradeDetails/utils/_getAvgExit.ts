function getAvgPrice(
  orders: {
    _id: string
    side: string
    date: Date
    price: number
    quantity: number
  }[],
  side: string
): number {
  if (side === 'Long') {
    const buyOrders = orders.filter(order => order.side === 'Short')

    const totalPrice = buyOrders.reduce((total, value) => {
      return total + value.quantity * value.price
    }, 0)

    const totalQuantity = buyOrders.reduce((total, value) => {
      return total + value.quantity
    }, 0)

    return totalPrice / totalQuantity || 0
  }

  if (side === 'Short') {
    const buyOrders = orders.filter(order => order.side === 'Long')

    const totalPrice = buyOrders.reduce((total, value) => {
      return total + value.quantity * value.price
    }, 0)

    const totalQuantity = buyOrders.reduce((total, value) => {
      return total + value.quantity
    }, 0)

    return totalPrice / totalQuantity || 0
  }
}

export default getAvgPrice
