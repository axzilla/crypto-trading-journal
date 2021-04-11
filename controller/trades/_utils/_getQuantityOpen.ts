function getQuantityOpen(
  orders: [{ id: string; side: string; date: Date; price: string; quantity: string }],
  side: string
): number {
  const quantityBuy = orders
    .filter(order => order.side === 'buy')
    .reduce((total, value) => total + Number(value.quantity), 0)

  const quantitySell = orders
    .filter(order => order.side === 'sell')
    .reduce((total, value) => total + Number(value.quantity), 0)

  if (side === 'buy') {
    return quantityBuy - quantitySell
  }

  if (side === 'sell') {
    return quantitySell - quantityBuy
  }
}

export default getQuantityOpen
