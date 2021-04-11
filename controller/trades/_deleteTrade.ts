// DB
import db from '../../knex'

async function deleteTrade(id: string): Promise<void> {
  const deletedTrade = await db('trades').where({ id }).del().returning('*')
  await db('orders').where({ trade_id: id }).del().returning('*')
  return deletedTrade[0]
}

export default deleteTrade
