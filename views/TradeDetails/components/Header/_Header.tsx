// Packages
import PropTypes from 'prop-types'

// Geist UI
import { Text, Grid, Button, Spacer } from '@geist-ui/react'
import { Trash as TrashIcon } from '@geist-ui/react-icons'

// Global Components
import { TradeCard } from 'components'

function Header({ trade, setIsDeleteTradeModalOpen }: HeaderProps): JSX.Element {
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
      <TradeCard trade={trade} />
    </>
  )
}

type HeaderProps = {
  setIsDeleteTradeModalOpen: (e: boolean | string) => void
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

Header.propTypes = {
  trade: PropTypes.object.isRequired,
  setIsDeleteTradeModalOpen: PropTypes.func.isRequired
}

export default Header
