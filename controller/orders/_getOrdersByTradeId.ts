// DB
import db from '../../knex'

type Props = {
  trade_id: string
}

function getOrdersByTradeId(trade_id: Props): [] {
  return db.select('*').from('orders').where({ trade_id })
}

export default getOrdersByTradeId
