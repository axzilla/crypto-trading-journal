function getQuantityOpen(
  orders: {
    _id: string
    side: string
    date: Date
    price: number
    quantity: number
  }[],
  side: string
): number {
  const quantityLong = orders
    .filter(order => order.side === 'Long')
    .reduce((total, value) => total + value.quantity, 0)

  const quantityShort = orders
    .filter(order => order.side === 'Short')
    .reduce((total, value) => total + value.quantity, 0)

  if (side === 'Long') {
    return quantityLong - quantityShort
  }

  if (side === 'Short') {
    return quantityShort - quantityLong
  }
}

export default getQuantityOpen
