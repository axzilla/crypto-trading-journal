// Packages
import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

// Geist UI
import { Modal, Grid } from '@geist-ui/react'

// Components UI
import { Select, DateTimePicker, Number } from '../../components-ui'

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
    price: null,
    quantity: null
  })

  useEffect(() => {
    order && setOrderData(order)
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
              { label: 'Long', value: 'Long' },
              { label: 'Short', value: 'Short' }
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
            value={new Date(orderData.date)}
            fullWidth
          />
          <Number
            onChange={e => {
              setOrderData({ ...orderData, price: parseFloat(e.target.value) })
            }}
            value={orderData.price}
            placeholder="Price"
            label="Price"
            fullWidth
          />
          <Number
            value={orderData.quantity}
            onChange={e => {
              setOrderData({ ...orderData, quantity: parseFloat(e.target.value) })
            }}
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
  order?: { side: string; date: Date; price: number; quantity: number }
  isOrderModalOpen: boolean
  setIsOrderModalOpen: (e: boolean) => void
  handleCreateOrder?: (e: { side: string; date: Date; price: number; quantity: number }) => void
  handleUpdateOrder?: (e: { side: string; date: Date; price: number; quantity: number }) => void
}

OrderModal.propTypes = {
  order: PropTypes.object,
  isOrderModalOpen: PropTypes.bool.isRequired,
  setIsOrderModalOpen: PropTypes.func.isRequired,
  handleCreateOrder: PropTypes.func,
  handleUpdateOrder: PropTypes.func
}

export default OrderModal
