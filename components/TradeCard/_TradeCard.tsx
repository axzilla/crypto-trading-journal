// Packages
import PropTypes from 'prop-types'

// Geist UI
import { Card, Grid, Description, Dot } from '@geist-ui/react'

// Global Utils
import formatCurrency from '@utils/formatCurrency'
import formatQuantity from '@utils/formatQuantity'

function TradeCard({ trade }: Props): JSX.Element {
  function getStatusColor(trade): Partial<'warning' | 'error'> {
    if (trade.status === 'WINNER' || trade.returnPercent >= 0) return 'warning'
    if (trade.status === 'LOOSER' || trade.returnPercent < 0) return 'error'
  }

  return (
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
          <Description title="Fees" content={formatCurrency(trade.fees)} />
        </Grid>
        <Grid xs>
          <Description
            title="Net Return"
            content={formatCurrency(trade.returnTotal - trade.fees)}
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
  )
}

type Props = {
  trade: {
    _id: string
    type: string
    leverage: number
    exchange: string
    status: string
    symbol: string
    date: Date
    price: number
    quantity: number
    side: string
    fees: number
    cost: number
    avgEntry: number
    avgExit: number
    quantityTotal: number
    quantityOpen: number
    returnTotal: number
    returnPercent: number
  }
}

TradeCard.propTypes = {
  trade: PropTypes.object.isRequired
}

export default TradeCard
