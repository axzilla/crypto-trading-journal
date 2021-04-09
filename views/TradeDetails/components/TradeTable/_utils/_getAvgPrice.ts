function getAvgPrice(
  orders: [
    {
      id: string
      action: string
      date: Date
      price: string
      quantity: string
    }
  ],
  action: string
): number {
  const buyOrders = orders.filter(order => order.action === action)

  const totalPrice = buyOrders.reduce((total, value) => {
    return total + Number(value.quantity) * Number(value.price)
  }, 0)

  const totalQuantity = buyOrders.reduce((total, value) => {
    return total + Number(value.quantity)
  }, 0)

  return totalPrice / totalQuantity
}

export default getAvgPrice
