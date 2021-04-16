// Packages
import { useState } from 'react'
import PropTypes from 'prop-types'

// Geist UI
import { Button } from '@geist-ui/react'
import { Edit as EditIcon } from '@geist-ui/react-icons'

// Global Components
import { OrderModal } from 'components'

function EditOrder({ order, handleCrdOrder }: EditOrderProps): JSX.Element {
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false)

  return (
    <>
      <Button
        onClick={() => setIsOrderModalOpen(true)}
        iconRight={<EditIcon />}
        auto
        size="small"
      />
      <OrderModal
        isOrderModalOpen={isOrderModalOpen}
        setIsOrderModalOpen={setIsOrderModalOpen}
        handleCrdOrder={handleCrdOrder}
        order={order}
      />
    </>
  )
}

type EditOrderProps = {
  order: { date: Date; side: string; price: number; quantity: number; _id: string }
  handleCrdOrder: (order: unknown, type: string) => void
}

EditOrder.propTypes = {
  order: PropTypes.object.isRequired,
  handleCrdOrder: PropTypes.func.isRequired
}

export default EditOrder
