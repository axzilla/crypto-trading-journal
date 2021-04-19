// Packages
import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

// Geist UI
import { Modal, Grid, Text } from '@geist-ui/react'

// Components UI
import { Select, DateTimePicker, Number } from '../../components-ui'

function OrderModal({
  isOrderModalOpen,
  setIsOrderModalOpen,
  order,
  handleCrdOrder,
  isLastItem
}: Props): JSX.Element {
  const [isDeleteOrderModalOpen, setIsDeleteOrderModalOpen] = useState(false)

  const [orderData, setOrderData] = useState({
    side: '',
    date: new Date(),
    price: null,
    quantity: null,
    fees: null
  })

  useEffect(() => {
    order && setOrderData(order)
  }, [order])

  function resetForm() {
    setOrderData({
      side: '',
      date: new Date(),
      price: null,
      quantity: null,
      fees: null
    })
  }

  return (
    <>
      <Modal open={isOrderModalOpen} onClose={() => setIsOrderModalOpen(false)}>
        <Modal.Title>{order ? 'Edit Order' : 'Add Order'}</Modal.Title>
        <Modal.Content>
          <Grid.Container justify="center">
            <Select
              onChange={value => setOrderData({ ...orderData, side: value })}
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
              onChange={value => setOrderData({ ...orderData, date: new Date(value) })}
              value={new Date(orderData.date)}
              fullWidth
            />
            <Number
              onChange={e => setOrderData({ ...orderData, price: parseFloat(e.target.value) })}
              value={orderData.price}
              placeholder="Price"
              label="Price"
              fullWidth
            />
            <Number
              value={orderData.quantity}
              onChange={e => setOrderData({ ...orderData, quantity: parseFloat(e.target.value) })}
              placeholder="Quantity"
              label="Quantity"
              fullWidth
            />
            <Number
              value={orderData.fees}
              onChange={e => setOrderData({ ...orderData, fees: parseFloat(e.target.value) })}
              placeholder="Fees"
              label="Fees"
              fullWidth
            />
          </Grid.Container>
        </Modal.Content>
        {order && (
          <Modal.Action disabled={isLastItem} onClick={() => setIsDeleteOrderModalOpen(true)}>
            <Text type="error">Delete</Text>
          </Modal.Action>
        )}
        <Modal.Action passive onClick={() => setIsOrderModalOpen(false)}>
          Cancel
        </Modal.Action>
        <Modal.Action
          disabled={!orderData.date || !orderData.price || !orderData.quantity || !orderData.side}
          onClick={() => {
            handleCrdOrder(orderData, order ? 'update' : 'create')
            resetForm()
            setIsOrderModalOpen(false)
          }}
        >
          Save
        </Modal.Action>
      </Modal>

      {/* Delete order modal */}
      <Modal
        open={isDeleteOrderModalOpen ? true : false}
        onClose={() => setIsDeleteOrderModalOpen(false)}
      >
        <Modal.Title>Delete Order</Modal.Title>
        <Modal.Subtitle>This order will be deleted.</Modal.Subtitle>
        <Modal.Action passive onClick={() => setIsDeleteOrderModalOpen(false)}>
          Cancel
        </Modal.Action>
        <Modal.Action
          onClick={() => {
            handleCrdOrder(order, 'delete')
            setIsDeleteOrderModalOpen(false)
            setIsOrderModalOpen(false)
          }}
        >
          Delete Order
        </Modal.Action>
      </Modal>
    </>
  )
}

type Props = {
  order?: { fees: number; date: Date; side: string; price: number; quantity: number; _id: string }
  handleCrdOrder: (order: unknown, type: string) => void
  isOrderModalOpen: boolean
  setIsOrderModalOpen: (e: boolean) => void
  isLastItem?: boolean
}

OrderModal.propTypes = {
  isOrderModalOpen: PropTypes.bool.isRequired,
  setIsOrderModalOpen: PropTypes.func.isRequired,
  order: PropTypes.object,
  handleCrdOrder: PropTypes.func.isRequired,
  isLastItem: PropTypes.bool
}

export default OrderModal
