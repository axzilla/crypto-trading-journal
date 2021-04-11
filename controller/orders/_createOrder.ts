// DB
import db from '../../knex'

type Props = {
  user_id: string
  trade_id: string
  side: string
  date: string
  price: string
  quantity: string
}

async function createOrder(
  data: Props
): Promise<{
  user_id: string
  trade_id: string
  side: string
  date: string
  price: string
  quantity: string
}> {
  const createdOrder = await db('orders').insert(data).returning('*')
  return createdOrder[0]
}

export default createOrder
