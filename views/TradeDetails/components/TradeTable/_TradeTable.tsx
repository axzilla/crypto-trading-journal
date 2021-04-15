// Packages
import PropTypes from 'prop-types'

// Geist UI
import { Table, Tag, Text } from '@geist-ui/react'

// Global Utils
import nbs from '@utils/nbs'
import formatCurrency from '@utils/formatCurrency'
import formatQuantity from '@utils/formatQuantity'

function TradeTable({ trade }: TradeTableProps): JSX.Element {
  return (
    <Table
      data={[trade].map(() => {
        return {
          type:
            trade.type === 'Leverage' ? (
              <>
                {trade.type} ({trade.leverage}x)
              </>
            ) : (
              trade.type
            ),
          side: <Tag type="warning">{trade.side.toUpperCase()}</Tag>,
          quantityTotal: formatQuantity(trade.quantityTotal),
          quantityOpen: formatQuantity(trade.quantityOpen),
          cost: formatCurrency(trade.cost),
          avgEntryPrice: formatCurrency(trade.avgEntry),
          avgExitPrice: formatCurrency(trade.avgExit),
          returnTotal: (
            <Text type={trade.status === 'WINNER' || trade.returnTotal >= 0 ? 'warning' : 'error'}>
              {formatCurrency(trade.returnTotal)}
            </Text>
          ),
          returnPercent: (
            <Text
              type={trade.status === 'WINNER' || trade.returnPercent >= 0 ? 'warning' : 'error'}
            >
              {trade.returnPercent} %
            </Text>
          ),
          status: (
            <Tag invert type="warning">
              {trade.status}
            </Tag>
          )
        }
      })}
    >
      <Table.Column prop="type" label="Type" />
      <Table.Column prop="side" label="Side" />
      <Table.Column prop="quantityTotal" label={nbs('Qty Total')} />
      <Table.Column prop="quantityOpen" label={nbs('Qty Open')} />
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
    _id: string
    type: string
    exchange: string
    symbol: string
    side: string
    status: string
    leverage: number
    quantityTotal: number
    quantityOpen: number
    cost: number
    avgEntry: number
    avgExit: number
    returnTotal: number
    returnPercent: number
  }
}

TradeTable.propTypes = {
  trade: PropTypes.object.isRequired
}

export default TradeTable
