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
          quantityTotal: formatQuantity(Number(trade.quantity_total)),
          quantityOpen: formatQuantity(Number(trade.quantity_open)),
          cost: formatCurrency(Number(trade.cost)),
          avgEntryPrice: formatCurrency(Number(trade.avg_entry)),
          avgExitPrice: formatCurrency(Number(trade.avg_exit)),
          returnTotal: (
            <Text
              type={trade.status === 'WINNER' || trade.return_total >= '0' ? 'warning' : 'error'}
            >
              {formatCurrency(Number(trade.return_total))}
            </Text>
          ),
          returnPercent: (
            <Text
              type={trade.status === 'WINNER' || trade.return_percent >= '0' ? 'warning' : 'error'}
            >
              {trade.return_percent} %
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
    id: string
    type: string
    leverage: number
    exchange: string
    symbol: string
    side: string
    status: string
    quantity_total: string
    quantity_open: string
    cost: string
    avg_entry: string
    avg_exit: string
    return_total: string
    return_percent: string
  }
}

TradeTable.propTypes = {
  trade: PropTypes.object.isRequired
}

export default TradeTable
