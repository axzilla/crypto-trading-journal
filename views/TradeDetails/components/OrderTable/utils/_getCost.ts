function getCost(
  orders: {
    _id: string
    side: string
    date: Date
    price: number
    quantity: number
  }[]
): number {
  const firstCreatedOrder = orders
    .sort((a, b): number => {
      if (new Date(a.date) > new Date(b.date)) return -1
      else if (new Date(a.date) < new Date(b.date)) return 1
      else return 0
    })
    .slice(0, 1)[0]

  const side = firstCreatedOrder.side

  return orders
    .filter(order => order.side === side)
    .reduce((total, value) => {
      return total + value.price * value.quantity
    }, 0)
}

export default getCost
