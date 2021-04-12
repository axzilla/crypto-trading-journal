// DB
import db from '../../knex'

type Props = {
  type: string
  leverage: number
  symbol: string
  exchange: string
  quantity_total: string
  quantity_open: string
  cost: string
  avg_entry: string
  date: string
  price: string
  quantity: string
  user_id: string
  side: string
}

async function createTrade(
  data: Props
): Promise<{
  type: string
  leverage: number
  symbol: string
  exchange: string
  quantity_total: string
  quantity_open: string
  cost: string
  avg_entry: string
  date: string
  price: string
  quantity: string
  user_id: string
  side: string
}> {
  const {
    // Trade
    type,
    leverage,
    symbol,
    exchange,
    quantity_total,
    quantity_open,
    cost,
    avg_entry,
    // Initial order
    date,
    price,
    quantity,
    // Trade & initial order
    user_id,
    side
  } = data

  const tradeData = {
    type,
    leverage,
    symbol,
    exchange,
    quantity_total,
    quantity_open,
    cost,
    avg_entry,
    user_id,
    side
  }

  const initialOrderData = { date, price, quantity, user_id, side }

  const createdTrade = await db('trades').insert(tradeData).returning('*')

  await db('orders')
    .insert({ ...initialOrderData, trade_id: createdTrade[0].id })
    .returning('*')

  return createdTrade[0]
}

export default createTrade
