// Packages
import { useState, useRef } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import ResizeObserver from 'react-resize-observer'

// Geist UI
import { Text, Card, useToasts, Spacer, Grid, Button, Loading, Modal } from '@geist-ui/react'
import { Trash as TrashIcon, Upload as UploadIcon } from '@geist-ui/react-icons'

function Images({ trade, mutate }: SetupsProps): JSX.Element {
  const [isLoading, setIslLoading] = useState(false)
  const [, setToast] = useToasts()
  const hiddenFileInput = useRef(null)
  const [width, setWidth] = useState(window.innerWidth)
  const [isImagePreviewModal, setIsImagePreviewModal] = useState(null)
  const [isImageDeleteModal, setIsImageDeleteModal] = useState(null)

  async function handleAddImages(e) {
    try {
      setIslLoading(true)
      const formData = new FormData()
      formData.append('tradeId', trade._id)
      Array.from(e.target.files).map((image: Blob) => formData.append('image', image))
      await axios.post('/api/v1/image/create-images', formData)
      await mutate()
      setToast({ text: 'Image(s) added successfully!', type: 'success', delay: 5000 })
      setIslLoading(false)
    } catch (error) {
      setToast({ text: 'Error, please try it again!', type: 'error', delay: 5000 })
      setIslLoading(false)
      if (error) throw error
    }
  }

  async function handleDeleteImage() {
    try {
      setIslLoading(true)
      await axios.post('/api/v1/image/delete-image', {
        tradeId: trade._id,
        image: isImageDeleteModal
      })
      await mutate()
      setToast({ text: 'Image deleted successfully!', type: 'success', delay: 5000 })
      setIsImageDeleteModal(null)
      setIslLoading(false)
    } catch (error) {
      setToast({ text: 'Error, please try it again!', type: 'error', delay: 5000 })
      setIslLoading(false)
      if (error) throw error
    }
  }

  return (
    <Grid.Container>
      <Text b>Images</Text>
      <Grid.Container justify="space-between">
        <input
          accept="image/*"
          onChange={handleAddImages}
          ref={hiddenFileInput}
          style={{ display: 'none' }}
          id="raised-button-file"
          type="file"
          multiple
        />
      </Grid.Container>
      <Spacer />
      <Grid.Container gap={2}>
        {trade.images.map((image: { secure_url: string }) => {
          return (
            <Grid key={Math.random()} xs={12} md={6}>
              <Card
                onClick={() => setIsImagePreviewModal(image.secure_url)}
                hoverable
                style={{
                  background: `url(${image.secure_url})`,
                  backgroundSize: 'cover',
                  height: width,
                  position: 'relative',
                  cursor: 'pointer'
                }}
              >
                <Button
                  onClick={e => {
                    e.stopPropagation()
                    setIsImageDeleteModal(image)
                  }}
                  loading={isLoading}
                  style={{ position: 'absolute', top: 0, right: 0, margin: 10 }}
                  size="small"
                  auto
                  iconRight={<TrashIcon />}
                />
              </Card>
            </Grid>
          )
        })}
        <Grid xs={12} md={6}>
          <Card
            onClick={() => hiddenFileInput.current.click()}
            style={{ height: width, cursor: 'pointer' }}
            hoverable
          >
            <ResizeObserver onResize={({ width }) => setWidth(width)} />

            <div style={{ height: width }}>
              <Grid.Container style={{ height: '80%' }} justify="center" alignItems="center">
                {isLoading ? <Loading type="warning" /> : <UploadIcon />}
              </Grid.Container>
            </div>
          </Card>
        </Grid>
      </Grid.Container>

      {/* Image preview modal */}
      <Modal
        width="100%"
        open={isImagePreviewModal ? true : false}
        onClose={() => setIsImagePreviewModal(null)}
      >
        <img
          aria-hidden="true"
          alt="screenshot"
          onClick={() => setIsImagePreviewModal(null)}
          src={isImagePreviewModal}
          style={{ maxWidth: '100%', maxHeight: '80vh', objectFit: 'contain' }}
        />
      </Modal>

      {/* Image delete modal */}
      <Modal open={isImageDeleteModal ? true : false} onClose={() => setIsImageDeleteModal(null)}>
        <Modal.Title>Delete Image</Modal.Title>
        <Modal.Subtitle>This image will be deleted.</Modal.Subtitle>
        <Modal.Action passive onClick={() => setIsImageDeleteModal(null)}>
          Cancel
        </Modal.Action>
        <Modal.Action onClick={handleDeleteImage}>Delete Image</Modal.Action>
      </Modal>
    </Grid.Container>
  )
}

type SetupsProps = {
  mutate: () => void
  trade: {
    _id: string
    type: string
    exchange: string
    symbol: string
    side: string
    status: string
    leverage: number
    quantityTotal: number
    quantityOpen: number
    cost: number
    avgEntry: number
    avgExit: number
    returnTotal: number
    returnPercent: number
    notes: string
    setups: string[]
    mistakes: string[]
    images: []
  }
}

Images.propTypes = {
  mutate: PropTypes.func.isRequired,
  trade: PropTypes.object.isRequired
}

export default Images
