function getQuantity(
  orders: [
    { id: string; action: string; date: Date; price: string; quantity: string; fee: string }
  ],
  side: string
): number {
  const quantityBuy = orders
    .filter(order => order.action === 'buy')
    .reduce((total, value) => total + Number(value.quantity), 0)

  const quantitySell = orders
    .filter(order => order.action === 'sell')
    .reduce((total, value) => total + Number(value.quantity), 0)

  if (side === 'buy') {
    return quantityBuy - quantitySell
  }

  if (side === 'sell') {
    return quantitySell - quantityBuy
  }
}

export default getQuantity
