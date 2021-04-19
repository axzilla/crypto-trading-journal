function getSide(
  orders: {
    _id: string
    side: string
    date: Date
    price: number
    quantity: number
  }[]
): string {
  // Tradeside is based on the trade orders "first-date"
  return orders.sort((a, b): number => {
    if (new Date(a.date) < new Date(b.date)) return -1
    else if (new Date(a.date) > new Date(b.date)) return 1
    else return 0
  })[0].side
}

export default getSide
