// Packages
import PropTypes from 'prop-types'

// Geist UI
import { Table, Tag, Text } from '@geist-ui/react'

// Global Utils
import nbs from '@utils/nbs'
import formatCurrency from '@utils/formatCurrency'
import formatQuantity from '@utils/formatQuantity'

// Local Utils
import {
  getCost,
  getQuantity,
  getSide,
  getAvgPrice,
  getSize,
  getReturnPercent,
  getReturnTotal,
  getStatus
} from './_utils'

function TradeTable({ trade, orders }: TradeTableProps): JSX.Element {
  return (
    <Table
      data={[trade].map(() => {
        const side = getSide(orders)
        const size = getSize(orders, side)
        const quantity = getQuantity(orders, side)
        const cost = getCost(orders)
        const avgEntry = getAvgPrice(orders, side === 'buy' ? 'buy' : 'sell')
        const avgExit = getAvgPrice(orders, side === 'sell' ? 'buy' : 'sell')
        const returnTotal = getReturnTotal(avgEntry, avgExit, size)
        const returnPercent = getReturnPercent(cost, returnTotal)
        const status = getStatus(quantity, avgEntry, avgExit)

        return {
          side: <Tag type="warning">{side.toUpperCase()}</Tag>,
          size: size,
          quantity: formatQuantity(quantity),
          cost: formatCurrency(cost),
          avgEntryPrice: formatCurrency(avgEntry),
          avgExitPrice: formatCurrency(avgExit),
          returnTotal: (
            <Text type={avgEntry < avgExit ? 'warning' : 'error'}>
              {formatCurrency(returnTotal)}
            </Text>
          ),
          returnPercent: (
            <Text type={avgEntry < avgExit ? 'warning' : 'error'}>{returnPercent.toFixed(2)}</Text>
          ),
          status: (
            <Tag invert type="warning">
              {status}
            </Tag>
          )
        }
      })}
    >
      <Table.Column prop="side" label="Side" />
      <Table.Column prop="size" label={'Size'} />
      <Table.Column prop="quantity" label={'Open'} />
      <Table.Column prop="cost" label="Cost" />
      <Table.Column prop="avgEntryPrice" label={nbs('Avg Entry')} />
      <Table.Column prop="avgExitPrice" label={nbs('Avg Exit')} />
      <Table.Column prop="returnTotal" label={nbs('Return $')} />
      <Table.Column prop="returnPercent" label={nbs('Return %')} />
      <Table.Column prop="status" label="Result" />
    </Table>
  )
}

type TradeTableProps = {
  trade: {
    id: string
    exchange: string
    symbol: Date
    status: string
  }
  orders: [
    {
      id: string
      action: string
      date: Date
      price: string
      quantity: string
    }
  ]
}

TradeTable.propTypes = {
  trade: PropTypes.object.isRequired,
  orders: PropTypes.array.isRequired
}

export default TradeTable
