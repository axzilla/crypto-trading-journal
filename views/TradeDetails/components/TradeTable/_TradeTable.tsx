// Packages
import PropTypes from 'prop-types'

// Geist UI
import { Text, Card, Grid, Button, Description, Dot, Spacer } from '@geist-ui/react'
import { Trash as TrashIcon } from '@geist-ui/react-icons'

// Global Utils
import formatCurrency from '@utils/formatCurrency'
import formatQuantity from '@utils/formatQuantity'

function TradeTable({ trade, setIsDeleteTradeModalOpen }: TradeTableProps): JSX.Element {
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
            <Description
              title="Type"
              content={
                trade.type === 'Leverage' ? (
                  <>
                    {trade.type} ({trade.leverage}x)
                  </>
                ) : (
                  trade.type
                )
              }
            />
          </Grid>
          <Grid xs>
            <Description title="Side" content={trade.side} />
          </Grid>
          <Grid xs>
            <Description title="Qty Total" content={formatQuantity(trade.quantityTotal)} />
          </Grid>
          <Grid xs>
            <Description title="Qty Open" content={formatQuantity(trade.quantityOpen)} />
          </Grid>
          <Grid xs>
            <Description title="Cost" content={formatCurrency(trade.cost)} />
          </Grid>
          <Grid xs>
            <Description title="Avg Entry" content={formatCurrency(trade.avgEntry)} />
          </Grid>
          <Grid xs>
            <Description title="Avg Exit" content={formatCurrency(trade.avgExit)} />
          </Grid>
          <Grid xs>
            <Description title="PNL $" content={formatCurrency(trade.returnTotal)} />
          </Grid>
          <Grid xs>
            <Description title="PNL %" content={trade.returnPercent.toFixed(2)} />
          </Grid>
          <Grid xs>
            <Description
              title="Status"
              content={
                <Dot
                  type={trade.status === 'WINNER' || trade.returnPercent >= 0 ? 'warning' : 'error'}
                >
                  {trade.status}
                </Dot>
              }
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
