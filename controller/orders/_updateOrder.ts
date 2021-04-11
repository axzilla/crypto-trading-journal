// DB
import db from '../../knex'

type Props = {
  id: string
  side: string
  sidatede: string
  date: string
  price: string
  quantity: string
}

async function updateOrder(
  data: Props
): Promise<{
  id: string
  side: string
  sidatede: string
  date: string
  price: string
  quantity: string
}> {
  const { id, side, date, price, quantity } = data
  const updatedTrade = await db('orders')
    .where({ id })
    .update({ side, date, price, quantity })
    .returning('*')
  return updatedTrade[0]
}

export default updateOrder
