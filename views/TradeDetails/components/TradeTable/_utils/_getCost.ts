function getCost(
  orders: [{ id: string; action: string; date: Date; price: string; quantity: string }]
): number {
  const firstCreatedOrder = orders
    .sort((a, b): number => Number(a.date) - Number(b.date))
    .slice(0, 1)[0]

  const side = firstCreatedOrder.action

  return orders
    .filter(order => order.action === side)
    .reduce((total, value) => {
      return total + Number(value.price) * Number(value.quantity)
    }, 0)
}

export default getCost
