// DB
import db from '../../knex'

import {
  getCost,
  getSide,
  getAvgEntry,
  getAvgExit,
  getQuantityOpen,
  getQuantityTotal,
  getReturnPercent,
  getReturnTotal,
  getStatus
} from './_utils'

type Props = {
  id: string
  side: string
  quantity_total: string
  quantity_open: string
  cost: string
  avg_entry: string
  avg_exit: string
  return_total: string
  return_percent: string
  status: string
}

async function updateTrade(
  data: Props
): Promise<{
  id: string
  side: string
  quantity_total: string
  quantity_open: string
  cost: string
  avg_entry: string
  avg_exit: string
  return_total: string
  return_percent: string
  status: string
}> {
  const ordersByTradeId = await db.select('*').from('orders').where({ trade_id: data.id })

  const side = getSide(ordersByTradeId)
  const quantity_total = getQuantityTotal(ordersByTradeId, side)
  const quantity_open = getQuantityOpen(ordersByTradeId, side)
  const cost = getCost(ordersByTradeId)
  const avg_entry = getAvgEntry(ordersByTradeId, side)
  const avg_exit = getAvgExit(ordersByTradeId, side)
  const return_total = getReturnTotal(avg_entry, avg_exit, side, ordersByTradeId)
  const return_percent = getReturnPercent(cost, return_total)
  const status = getStatus(quantity_open, avg_entry, avg_exit, side)

  const tradeData = {
    side: side,
    quantity_total: String(quantity_total),
    quantity_open: String(quantity_open),
    cost: String(cost),
    avg_entry: String(avg_entry),
    avg_exit: String(avg_exit),
    return_total: String(return_total),
    return_percent: String(return_percent),
    status
  }

  const updatedTrade = await db('trades')
    .where({ id: data.id })
    .update({ ...tradeData })
    .returning('*')

  return updatedTrade[0]
}

export default updateTrade
