function getSide(
  orders: [
    {
      id: string
      action: string
      date: Date
      price: string
      quantity: string
    }
  ]
): string {
  // Tradeside is based on the trade orders "first-date"
  return orders.sort((a, b): number => Number(a.date) - Number(b.date))[0].action
}
export default getSide
