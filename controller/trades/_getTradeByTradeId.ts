// DB
import db from '../../knex'

type Props = {
  id: string
}

function getTradeByTradeId(id: Props): [] {
  return db.select('*').from('trades').where({ id })
}

export default getTradeByTradeId
