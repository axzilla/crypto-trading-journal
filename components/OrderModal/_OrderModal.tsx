// Packages
import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

// Geist UI
import { Modal, Grid } from '@geist-ui/react'

// Components UI
import { Input, Select, DateTimePicker } from '../../components-ui'

function OrderModal({
  order,
  isOrderModalOpen,
  setIsOrderModalOpen,
  handleCreateOrder,
  handleUpdateOrder
}: Props): JSX.Element {
  const [orderData, setOrderData] = useState({
    side: '',
    date: new Date(),
    price: '',
    quantity: ''
  })

  useEffect(() => {
    order && setOrderData({ ...order, date: new Date(Number(order.date)) })
  }, [])

  return (
    <Modal
      open={isOrderModalOpen}
      onClose={() => {
        setIsOrderModalOpen(false)
      }}
    >
      <Modal.Title>{order ? 'Edit Order' : 'Add Order'}</Modal.Title>
      <Modal.Content>
        <Grid.Container justify="center">
          <Select
            onChange={value => {
              setOrderData({ ...orderData, side: value })
            }}
            options={[
              { label: 'Buy / Long', value: 'buy' },
              { label: 'Sell / Short', value: 'sell' }
            ]}
            placeholder="Choose one"
            label="Side"
            value={orderData.side}
            fullWidth
          />
          <DateTimePicker
            label="Date"
            onChange={value => {
              setOrderData({ ...orderData, date: new Date(value) })
            }}
            value={orderData.date}
            fullWidth
          />
          <Input
            onChange={e => {
              setOrderData({ ...orderData, price: e.target.value })
            }}
            value={orderData.price}
            type="number"
            name="price"
            placeholder="Price"
            label="Price"
            fullWidth
          />
          <Input
            value={orderData.quantity}
            onChange={e => {
              setOrderData({ ...orderData, quantity: e.target.value })
            }}
            name="quantity"
            type="number"
            placeholder="Quantity"
            label="Quantity"
            fullWidth
          />
        </Grid.Container>
      </Modal.Content>
      <Modal.Action
        passive
        onClick={() => {
          setIsOrderModalOpen(false)
        }}
      >
        Cancel
      </Modal.Action>
      <Modal.Action
        disabled={!orderData.date || !orderData.price || !orderData.quantity || !orderData.side}
        onClick={() => {
          if (order) {
            handleUpdateOrder(orderData)
          } else {
            handleCreateOrder(orderData)
          }

          setIsOrderModalOpen(false)
        }}
      >
        Save
      </Modal.Action>
    </Modal>
  )
}

type Props = {
  order?: { side: string; date: Date; price: string; quantity: string }
  isOrderModalOpen: boolean
  setIsOrderModalOpen: (e: boolean) => void
  handleCreateOrder?: (e: { side: string; date: Date; price: string; quantity: string }) => void
  handleUpdateOrder?: (e: { side: string; date: Date; price: string; quantity: string }) => void
}

OrderModal.propTypes = {
  order: PropTypes.object,
  isOrderModalOpen: PropTypes.bool.isRequired,
  setIsOrderModalOpen: PropTypes.func.isRequired,
  handleCreateOrder: PropTypes.func,
  handleUpdateOrder: PropTypes.func
}

export default OrderModal
