// Packages
import PropTypes from 'prop-types'

// Geist UI
import { Text, Card, Grid, Button, Description, Dot, Spacer } from '@geist-ui/react'
import { Trash as TrashIcon } from '@geist-ui/react-icons'

// Global Utils
import formatCurrency from '@utils/formatCurrency'
import formatQuantity from '@utils/formatQuantity'

function TradeTable({ trade, setIsDeleteTradeModalOpen }: TradeTableProps): JSX.Element {
  function getStatusColor(trade): Partial<'warning' | 'error'> {
    if (trade.status === 'WINNER' || trade.returnPercent >= 0) return 'warning'
    if (trade.status === 'LOOSER' || trade.returnPercent < 0) return 'error'
  }

  return (
    <>
      <Grid.Container alignItems="center" justify="space-between">
        <Text h2 style={{ margin: 0, lineHeight: 0 }}>
          {trade.symbol}
        </Text>
        <Button
          onClick={() => setIsDeleteTradeModalOpen(trade._id)}
          size="small"
          iconRight={<TrashIcon />}
          auto
        />
      </Grid.Container>
      <Spacer />
      <Card>
        <Grid.Container gap={2}>
          <Grid xs>
            <Description title="Exchange" content={trade.exchange} />
          </Grid>
          <Grid xs>
            <Description title="Side" content={trade.side} />
          </Grid>
          <Grid xs>
            <Description
              title="Qty Total / Open"
              content={`${formatQuantity(trade.quantityTotal)} / ${formatQuantity(
                trade.quantityOpen
              )}`}
            />
          </Grid>
          <Grid xs>
            <Description
              title="Cost"
              content={
                <>
                  {formatCurrency(trade.cost)}
                  <br />
                  {trade.type === 'Leverage' && <>({trade.leverage}x)</>}
                </>
              }
            />
          </Grid>
          <Grid xs>
            <Description
              title="Avg Entry / Exit"
              content={`${formatCurrency(trade.avgEntry)} / ${formatCurrency(trade.avgExit)}`}
            />
          </Grid>
          <Grid xs>
            <Description
              title="PNL"
              content={
                <>
                  {formatCurrency(trade.returnTotal)} ({trade.returnPercent.toFixed(2)}%)
                </>
              }
            />
          </Grid>
          <Grid xs>
            <Description
              title="Status"
              content={<Dot type={getStatusColor(trade)}>{trade.status}</Dot>}
            />
          </Grid>
        </Grid.Container>
      </Card>
    </>
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
