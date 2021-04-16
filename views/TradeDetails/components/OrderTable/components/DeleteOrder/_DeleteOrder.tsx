// Packages
import { useState } from 'react'
import PropTypes from 'prop-types'

// Geist UI
import { Button, Modal } from '@geist-ui/react'
import { Trash as TrashIcon } from '@geist-ui/react-icons'

function DeleteOrder({ trade, order, handleCrdOrder }: DeleteOrderProps): JSX.Element {
  const [isDeleteOrderModalOpen, setIsDeleteOrderModalOpen] = useState(false)

  return (
    <>
      <Button
        disabled={trade.orders.length < 2}
        onClick={() => setIsDeleteOrderModalOpen(true)}
        iconRight={<TrashIcon />}
        auto
        size="small"
      />
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
          }}
        >
          Delete Order
        </Modal.Action>
      </Modal>
    </>
  )
}

type DeleteOrderProps = {
  trade: {
    _id: string
    dateUpdated: Date
    type: string
    leverage: number
    exchange: string
    symbol: string
    quantityTotal: number
    quantityOpen: number
    quantityCost: number
    avgEntry: number
    avgExit: number
    returnTotal: number
    returnPercent: number
    side: string
    orders: [{ date: Date; side: string; price: number; quantity: number; _id: string }]
    setups: []
    mistakes: []
    images: []
  }
  order: { date: Date; side: string; price: number; quantity: number; _id: string }
  handleCrdOrder: (order: unknown, type: string) => void
}

DeleteOrder.propTypes = {
  order: PropTypes.object.isRequired,
  handleCrdOrder: PropTypes.func.isRequired
}

export default DeleteOrder
