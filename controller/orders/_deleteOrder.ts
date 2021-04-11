// DB
import db from '../../knex'

async function updateOrder(
  id: string
): Promise<{
  id: string
  side: string
  sidatede: string
  date: string
  price: string
  quantity: string
}> {
  const deletedOrder = await db('orders').where({ id }).del().returning('*')
  return deletedOrder[0]
}

export default updateOrder
