function getQuantityTotal(
  orders: {
    _id: string
    side: string
    date: Date
    price: number
    quantity: number
  }[],
  side: string
): number {
  return orders
    .filter(order => order.side === side)
    .reduce((total, value) => {
      return total + value.quantity
    }, 0)
}

export default getQuantityTotal
