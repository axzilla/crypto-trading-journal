// Packages
import PropTypes from 'prop-types'

// Geist UI
import { Modal, Grid } from '@geist-ui/react'

// Components UI
import { Input, Autocomplete, Select, DateTimePicker } from '../../components-ui'

function TradeModal({
  tradeData,
  setTradeData,
  setIsTradeModalOpen,
  setExchangesRelated,
  handleCreateTrade,
  isTradeModalOpen,
  exchangesRelated,
  exchangesAll
}: Props): JSX.Element {
  return (
    <Modal open={isTradeModalOpen} onClose={() => setIsTradeModalOpen(false)}>
      <Modal.Title>Add Trade</Modal.Title>
      <Modal.Content>
        <Grid.Container justify="center">
          <Autocomplete
            onSearch={value => {
              if (!value) return setExchangesRelated([])
              const relatedOptions: { label: string; value: string }[] = exchangesAll.filter(
                item => {
                  return item.value.toLowerCase().includes(value.toLowerCase())
                }
              )
              setExchangesRelated(relatedOptions)
              setTradeData({ ...tradeData, exchange: value })
            }}
            value={tradeData.exchange}
            options={exchangesRelated}
            placeholder="Start typing"
            label="Exchange"
            fullWidth
          />
          <Input
            onChange={e => {
              setTradeData({ ...tradeData, symbol: e.target.value.toUpperCase() })
            }}
            name="symbol"
            placeholder="e.g. BTCUSD"
            label="Symbol"
            fullWidth
            value={tradeData.symbol}
          />
          <Select
            onChange={value => {
              setTradeData({ ...tradeData, action: value })
            }}
            options={[
              { label: 'Buy / Long', value: 'buy' },
              { label: 'Sell / Short', value: 'sell' }
            ]}
            placeholder="Choose one"
            label="Action"
            value={tradeData.action}
            fullWidth
          />
          <DateTimePicker
            label="Date"
            onChange={value => {
              setTradeData({ ...tradeData, date: new Date(value) })
            }}
            value={tradeData.date}
            fullWidth
          />
          <Input
            onChange={e => {
              setTradeData({ ...tradeData, price: e.target.value })
            }}
            value={tradeData.price}
            type="number"
            name="price"
            placeholder="Price"
            label="Price"
            fullWidth
          />
          <Input
            value={tradeData.quantity}
            onChange={e => {
              setTradeData({ ...tradeData, quantity: e.target.value })
            }}
            name="quantity"
            type="number"
            placeholder="Quantity"
            label="Quantity"
            fullWidth
          />
        </Grid.Container>
      </Modal.Content>
      <Modal.Action passive onClick={() => setIsTradeModalOpen(false)}>
        Cancel
      </Modal.Action>
      <Modal.Action
        disabled={
          !tradeData.exchange ||
          !tradeData.symbol ||
          !tradeData.date ||
          !tradeData.price ||
          !tradeData.quantity ||
          !tradeData.action
        }
        onClick={handleCreateTrade}
      >
        Submit
      </Modal.Action>
    </Modal>
  )
}

type Props = {
  tradeData: {
    exchange: string
    symbol: string
    date: Date
    price: string
    quantity: string
    action: string
  }
  setTradeData: (e: {
    exchange: string
    symbol: string
    date: Date
    price: string
    quantity: string
    action: string
  }) => void
  handleCreateTrade: () => void
  setExchangesRelated: (e: { label: string; value: string }[]) => void
  setIsTradeModalOpen: (e: boolean) => void
  isTradeModalOpen: boolean
  exchangesRelated: { label: string; value: string }[]
  exchangesAll: { label: string; value: string }[]
}

TradeModal.propTypes = {
  tradeData: PropTypes.object.isRequired,
  setTradeData: PropTypes.func.isRequired,
  handleCreateTrade: PropTypes.func.isRequired,
  setExchangesRelated: PropTypes.func.isRequired,
  setIsTradeModalOpen: PropTypes.func.isRequired,
  isTradeModalOpen: PropTypes.bool.isRequired,
  exchangesRelated: PropTypes.array.isRequired,
  exchangesAll: PropTypes.array.isRequired
}

export default TradeModal
