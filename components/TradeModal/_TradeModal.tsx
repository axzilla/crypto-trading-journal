import PropTypes from 'prop-types'

// Geist UI
import { Modal, Grid } from '@geist-ui/react'

// Components UI
import { Input, Autocomplete, Select, DateTimePicker } from '../../components-ui'

function TradeModal({
  setIsTradeModalOpen,
  setAction,
  setExchange,
  setSymbol,
  setDate,
  setPrice,
  setQuantity,
  setFee,
  setExchangesRelated,
  handleCreateTrade,
  isTradeModalOpen,
  action,
  exchange,
  symbol,
  date,
  price,
  quantity,
  fee,
  exchangesRelated,
  exchangesAll
}: TradeModalProps): JSX.Element {
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
              setExchange(value)
            }}
            value={exchange}
            options={exchangesRelated}
            placeholder="Start typing"
            label="Exchange"
            fullWidth
          />
          <Input
            onChange={e => setSymbol(e.target.value.toUpperCase())}
            name="symbol"
            placeholder="e.g. BTCUSD"
            label="Symbol"
            fullWidth
            value={symbol}
          />
          <Select
            onChange={value => setAction(value)}
            options={[
              { label: 'Buy / Long', value: 'buy' },
              { label: 'Sell / Short', value: 'sell' }
            ]}
            placeholder="Choose one"
            label="Action"
            value={action}
            fullWidth
          />
          <DateTimePicker label="Date" onChange={value => setDate(value)} value={date} fullWidth />
          <Input
            onChange={e => setPrice(e.target.value)}
            value={price}
            type="number"
            name="price"
            placeholder="Price"
            label="Price"
            fullWidth
          />
          <Input
            value={quantity}
            onChange={e => setQuantity(e.target.value)}
            name="quantity"
            type="number"
            placeholder="Quantity"
            label="Quantity"
            fullWidth
          />
          <Input
            value={fee}
            onChange={e => setFee(e.target.value)}
            name="fee"
            type="number"
            placeholder="Fee"
            label="Fee"
            fullWidth
          />
        </Grid.Container>
      </Modal.Content>
      <Modal.Action passive onClick={() => setIsTradeModalOpen(false)}>
        Cancel
      </Modal.Action>
      <Modal.Action
        disabled={!exchange || !symbol || !date || !price || !quantity || !fee || !action}
        onClick={handleCreateTrade}
      >
        Submit
      </Modal.Action>
    </Modal>
  )
}

type TradeModalProps = {
  handleCreateTrade: () => void
  setExchangesRelated: (e: { label: string; value: string }[]) => void
  setIsTradeModalOpen: (e: boolean) => void
  setAction: (e: string) => void
  setExchange: (e: string) => void
  setSymbol: (e: string) => void
  setDate: (e: string) => void
  setPrice: (e: string) => void
  setQuantity: (e: string) => void
  setFee: (e: string) => void
  isTradeModalOpen: boolean
  action: string
  exchange: string
  symbol: string
  date: string
  price: string
  quantity: string
  fee: string
  exchangesRelated: { label: string; value: string }[]
  exchangesAll: { label: string; value: string }[]
}

TradeModal.propTypes = {
  handleCreateTrade: PropTypes.func.isRequired,
  setExchangesRelated: PropTypes.func.isRequired,
  setIsTradeModalOpen: PropTypes.func.isRequired,
  setAction: PropTypes.func.isRequired,
  setExchange: PropTypes.func.isRequired,
  setSymbol: PropTypes.func.isRequired,
  setDate: PropTypes.func.isRequired,
  setPrice: PropTypes.func.isRequired,
  setQuantity: PropTypes.func.isRequired,
  setFee: PropTypes.func.isRequired,
  isTradeModalOpen: PropTypes.bool.isRequired,
  action: PropTypes.string.isRequired,
  exchange: PropTypes.string.isRequired,
  symbol: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  quantity: PropTypes.string.isRequired,
  fee: PropTypes.string.isRequired,
  exchangesRelated: PropTypes.array.isRequired,
  exchangesAll: PropTypes.array.isRequired
}

export default TradeModal
