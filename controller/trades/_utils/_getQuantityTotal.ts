function getQuantityTotal(
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
  return orders
    .filter(order => order.side === side)
    .reduce((total, value) => {
      return total + Number(value.quantity)
    }, 0)
}

export default getQuantityTotal
