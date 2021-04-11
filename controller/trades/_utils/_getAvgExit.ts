function getAvgPrice(
  orders: [
    {
      id: string
      side: string
      date: Date
      price: string
      quantity: string
    }
  ],
  side: string
): number {
  if (side === 'buy') {
    const buyOrders = orders.filter(order => order.side === 'sell')

    const totalPrice = buyOrders.reduce((total, value) => {
      return total + Number(value.quantity) * Number(value.price)
    }, 0)

    const totalQuantity = buyOrders.reduce((total, value) => {
      return total + Number(value.quantity)
    }, 0)

    return totalPrice / totalQuantity || 0
  }

  if (side === 'sell') {
    const buyOrders = orders.filter(order => order.side === 'buy')

    const totalPrice = buyOrders.reduce((total, value) => {
      return total + Number(value.quantity) * Number(value.price)
    }, 0)

    const totalQuantity = buyOrders.reduce((total, value) => {
      return total + Number(value.quantity)
    }, 0)

    return totalPrice / totalQuantity || 0
  }
}

export default getAvgPrice
