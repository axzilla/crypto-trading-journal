// DB
import db from '../../knex'

type Props = {
  user_id: string
}

function getTradesByUserId(user_id: Props): [] {
  return db.select('*').from('trades').where({ user_id })
}

export default getTradesByUserId
