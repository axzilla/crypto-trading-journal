function getSize(
  orders: [
    {
      id: string
      action: string
      date: Date
      price: string
      quantity: string
    }
  ],
  side: string
): number {
  return orders
    .filter(order => order.action === side)
    .reduce((total, value) => {
      return total + Number(value.quantity)
    }, 0)
}

export default getSize
