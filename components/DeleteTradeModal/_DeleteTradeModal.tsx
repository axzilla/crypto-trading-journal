// Packages
import PropTypes from 'prop-types'

// Geist UI
import { Modal } from '@geist-ui/react'

function DeleteTradeModal({
  isDeleteTradeModalOpen,
  setIsDeleteTradeModalOpen,
  handleDeleteTrade
}: Props): JSX.Element {
  return (
    <Modal
      open={isDeleteTradeModalOpen ? true : false}
      onClose={() => setIsDeleteTradeModalOpen(false)}
    >
      <Modal.Title>Delete Trade</Modal.Title>
      <Modal.Subtitle>This trade will be deleted.</Modal.Subtitle>
      <Modal.Action passive onClick={() => setIsDeleteTradeModalOpen(false)}>
        Cancel
      </Modal.Action>
      <Modal.Action onClick={() => handleDeleteTrade(isDeleteTradeModalOpen)}>
        Delete Trade
      </Modal.Action>
    </Modal>
  )
}

type Props = {
  isDeleteTradeModalOpen: boolean | string
  setIsDeleteTradeModalOpen: (e: boolean) => void
  handleDeleteTrade: (e: string | boolean) => void
}

DeleteTradeModal.propTypes = {
  isDeleteTradeModalOpen: PropTypes.bool.isRequired,
  setIsDeleteTradeModalOpen: PropTypes.func.isRequired,
  handleDeleteTrade: PropTypes.func.isRequired
}

export default DeleteTradeModal
