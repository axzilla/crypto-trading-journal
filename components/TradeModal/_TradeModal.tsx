// Packages
import PropTypes from 'prop-types'

// Geist UI
import { Modal, Grid, Slider, Spacer } from '@geist-ui/react'

// Components UI
import { Number, Autocomplete, Select, DateTimePicker } from 'components-ui'

function TradeModal({
  tradeData,
  setTradeData,
  setIsTradeModalOpen,
  handleCreateTrade,
  isTradeModalOpen,
  exchangesAll,
  exchangesRelated,
  setExchangesRelated,
  symbolsAll,
  symbolsRelated,
  setSymbolsRelated
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

          <Autocomplete
            onSearch={value => {
              if (!value) return setSymbolsRelated([])
              const relatedOptions: { label: string; value: string }[] = symbolsAll.filter(item => {
                return item.value.toLowerCase().includes(value.toLowerCase())
              })
              setSymbolsRelated(relatedOptions)
              setTradeData({ ...tradeData, symbol: value })
            }}
            value={tradeData.symbol}
            options={symbolsRelated}
            placeholder="Start typing"
            label="Symbol"
            fullWidth
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
          <Number
            value={tradeData.fees}
            onChange={e => {
              setTradeData({ ...tradeData, fees: parseFloat(e.target.value) })
            }}
            placeholder="Fees"
            label="Fees"
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
    fees: number
    side: string
  }
  setTradeData: (e: {
    type: string
    leverage: number
    exchange: string
    symbol: string
    date: Date
    price: number
    fees: number
    quantity: number
    side: string
  }) => void
  handleCreateTrade: () => void
  setIsTradeModalOpen: (e: boolean) => void
  isTradeModalOpen: boolean
  setExchangesRelated: (e: { label: string; value: string }[]) => void
  exchangesRelated: { label: string; value: string }[]
  exchangesAll: { label: string; value: string }[]
  setSymbolsRelated: (e: { label: string; value: string }[]) => void
  symbolsRelated: { label: string; value: string }[]
  symbolsAll: { label: string; value: string }[]
}

TradeModal.propTypes = {
  tradeData: PropTypes.object.isRequired,
  setTradeData: PropTypes.func.isRequired,
  handleCreateTrade: PropTypes.func.isRequired,
  setIsTradeModalOpen: PropTypes.func.isRequired,
  isTradeModalOpen: PropTypes.bool.isRequired,
  exchangesAll: PropTypes.array.isRequired,
  setExchangesRelated: PropTypes.func.isRequired,
  exchangesRelated: PropTypes.array.isRequired,
  symbolsAll: PropTypes.array.isRequired,
  setSymbolsRelated: PropTypes.func.isRequired,
  symbolsRelated: PropTypes.array.isRequired
}

export default TradeModal
