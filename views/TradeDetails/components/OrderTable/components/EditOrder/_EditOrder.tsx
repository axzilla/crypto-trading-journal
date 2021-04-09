// Packages
import { useState } from 'react'
import PropTypes from 'prop-types'

// Geist UI
import { Button } from '@geist-ui/react'
import { Edit as EditIcon } from '@geist-ui/react-icons'

// Global Components
import { OrderModal } from 'components'

function EditOrder({ order, handleUpdateOrder }: EditOrderProps): JSX.Element {
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false)

  return (
    <>
      <Button
        onClick={() => {
          setIsOrderModalOpen(true)
        }}
        iconRight={<EditIcon />}
        auto
        size="small"
      />
      {isOrderModalOpen && (
        <OrderModal
          order={order}
          isOrderModalOpen={isOrderModalOpen}
          setIsOrderModalOpen={setIsOrderModalOpen}
          handleUpdateOrder={handleUpdateOrder}
        />
      )}
    </>
  )
}

type EditOrderProps = {
  order: {
    action: string
    date: Date
    price: string
    quantity: string
  }
  handleUpdateOrder?: (e: { action: string; date: Date; price: string; quantity: string }) => void
}

EditOrder.propTypes = {
  order: PropTypes.object.isRequired,
  handleUpdateOrder: PropTypes.func.isRequired
}

export default EditOrder
