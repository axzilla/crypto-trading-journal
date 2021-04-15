// Packages
import PropTypes from 'prop-types'

// Geist UI
import { Modal, Grid, Slider, Spacer } from '@geist-ui/react'

// Components UI
import { Input, Number, Autocomplete, Select, DateTimePicker } from '../../components-ui'

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
          <Select
            onChange={value => {
              if (value === 'Spot') {
                setTradeData({ ...tradeData, type: value, leverage: 0 })
              } else {
                setTradeData({ ...tradeData, type: value })
              }
            }}
            options={[
              { label: 'Spot', value: 'Spot' },
              { label: 'Leverage', value: 'Leverage' }
            ]}
            placeholder="Choose one"
            label="Type"
            value={tradeData.type}
            fullWidth
          />

          {tradeData.type === 'Leverage' && (
            <>
              <Spacer />
              <Slider
                step={1}
                max={125}
                min={0}
                initialValue={tradeData.leverage}
                value={tradeData.leverage}
                onChange={value => setTradeData({ ...tradeData, leverage: value })}
              />
            </>
          )}

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
            placeholder="e.g. BTCUSD"
            label="Symbol"
            fullWidth
            value={tradeData.symbol}
          />
          <Select
            onChange={value => {
              setTradeData({ ...tradeData, side: value })
            }}
            options={[
              { label: 'Long', value: 'Long' },
              { label: 'Short', value: 'Short' }
            ]}
            placeholder="Choose one"
            label="Side"
            value={tradeData.side}
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
          <Number
            onChange={e => {
              setTradeData({ ...tradeData, price: parseFloat(e.target.value) })
            }}
            value={tradeData.price}
            placeholder="Price"
            label="Price"
            fullWidth
          />
          <Number
            value={tradeData.quantity}
            onChange={e => {
              setTradeData({ ...tradeData, quantity: parseFloat(e.target.value) })
            }}
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
          !tradeData.type ||
          !tradeData.exchange ||
          !tradeData.symbol ||
          !tradeData.date ||
          !tradeData.price ||
          !tradeData.quantity ||
          !tradeData.side
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
    type: string
    leverage: number
    exchange: string
    symbol: string
    date: Date
    price: number
    quantity: number
    side: string
  }
  setTradeData: (e: {
    type: string
    leverage: number
    exchange: string
    symbol: string
    date: Date
    price: number
    quantity: number
    side: string
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
