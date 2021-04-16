// Packages
import PropTypes from 'prop-types'

// Geist UI
import { Table, Tag, Text, Card, Grid, Button, Spacer } from '@geist-ui/react'
import { Trash as TrashIcon } from '@geist-ui/react-icons'

// Global Utils
import nbs from '@utils/nbs'
import formatCurrency from '@utils/formatCurrency'
import formatQuantity from '@utils/formatQuantity'

function TradeTable({ trade, setIsDeleteTradeModalOpen }: TradeTableProps): JSX.Element {
  return (
    <Card>
      <Grid.Container alignItems="center" justify="space-between">
        <Text style={{ margin: 0 }} h3>
          {trade.symbol} / {trade.exchange}{' '}
        </Text>
        <Button
          onClick={() => setIsDeleteTradeModalOpen(trade._id)}
          size="small"
          iconRight={<TrashIcon />}
          auto
        />
      </Grid.Container>
      <Spacer y={0.5} />
      <div style={{ overflow: 'scroll' }}>
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
                <Text
                  type={trade.status === 'WINNER' || trade.returnTotal >= 0 ? 'warning' : 'error'}
                >
                  {formatCurrency(trade.returnTotal)}
                </Text>
              ),
              returnPercent: (
                <Text
                  type={trade.status === 'WINNER' || trade.returnPercent >= 0 ? 'warning' : 'error'}
                >
                  {nbs(trade.returnPercent.toFixed(2) + ' %')}
                </Text>
              ),
              status: (
                <Tag
                  invert
                  type={trade.status === 'WINNER' || trade.returnPercent >= 0 ? 'warning' : 'error'}
                >
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
      </div>
    </Card>
  )
}

type TradeTableProps = {
  setIsDeleteTradeModalOpen: (e: boolean | string) => void
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
  trade: PropTypes.object.isRequired,
  setIsDeleteTradeModalOpen: PropTypes.func.isRequired
}

export default TradeTable
