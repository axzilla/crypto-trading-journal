// DB
import db from '../../knex'

type Props = {
  user_id: string
}

function getOrdersBuUserId(user_id: Props): [] {
  return db.select('*').from('orders').where({ user_id })
}

export default getOrdersBuUserId
