// Packages
import { useState } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'

// Geist UI
import { Text, Card, useToasts, Spacer, Tag, Modal, Grid } from '@geist-ui/react'

// Components UI
import { Input } from 'components-ui'

function TagItem({ type, tag, handleDeleteTag }: TagItemProps) {
  const [isDeleteTagModal, setIsDeleteTagModal] = useState(null)

  return (
    <>
      <Tag
        onClick={() => setIsDeleteTagModal(true)}
        invert
        type={type === 'setup' ? 'warning' : 'error'}
        key={tag}
        style={{ marginRight: 10, marginBottom: 10 }}
      >
        {tag}
      </Tag>

      <Modal open={isDeleteTagModal} onClose={() => setIsDeleteTagModal(false)}>
        <Modal.Title>Delete {type === 'setup' ? 'Setup' : 'Mistake'}</Modal.Title>
        <Modal.Subtitle>
          This {type === 'setup' ? 'Setup' : 'Mistake'} will be deleted.
        </Modal.Subtitle>
        <Modal.Action passive onClick={() => setIsDeleteTagModal(false)}>
          Cancel
        </Modal.Action>
        <Modal.Action
          onClick={() => {
            handleDeleteTag(tag)
            setIsDeleteTagModal(null)
          }}
        >
          Delete {type === 'setup' ? 'Setup' : 'Mistake'}
        </Modal.Action>
      </Modal>
    </>
  )
}

type TagItemProps = {
  type: string
  tag: string
  handleDeleteTag: (e: string) => void
}

TagItem.propTypes = {
  type: PropTypes.string.isRequired,
  tag: PropTypes.string.isRequired,
  handleDeleteTag: PropTypes.func.isRequired
}

function Tags({ trade, type, mutate }: SetupsProps): JSX.Element {
  const [, setToast] = useToasts()
  const [tag, setTag] = useState('')

  async function handleAddSetup(e) {
    try {
      if (e.target.value && e.key === 'Enter') {
        setTag('')

        if (!trade[type === 'setup' ? 'setups' : 'mistakes'].includes(e.target.value)) {
          const newtags: string[] = [
            ...trade[type === 'setup' ? 'setups' : 'mistakes'],
            e.target.value
          ]

          const changedTrade = { ...trade, [type === 'setup' ? 'setups' : 'mistakes']: newtags }
          await axios.post('/api/v1/trade/update-trade', { changedTrade })
          mutate()
          setToast({
            text: `${type === 'setup' ? 'Setup' : 'Mistake'} saved successfully!`,
            type: 'success',
            delay: 5000
          })
        }
      }
    } catch (error) {
      setToast({ text: 'Error, please try it again!', type: 'error', delay: 5000 })
      if (error) throw error
    }
  }

  async function handleDeleteTag(tag) {
    try {
      const index = trade[type === 'setup' ? 'setups' : 'mistakes'].indexOf(tag)
      const newtags: string[] = [
        ...trade[type === 'setup' ? 'setups' : 'mistakes'].slice(0, index),
        ...trade[type === 'setup' ? 'setups' : 'mistakes'].slice(index + 1)
      ]
      const changedTrade = { ...trade, [type === 'setup' ? 'setups' : 'mistakes']: newtags }
      await axios.post('/api/v1/trade/update-trade', { changedTrade })
      mutate()
      setToast({
        text: `${type === 'setup' ? 'Setup' : 'Mistake'} deleted successfully!`,
        type: 'success',
        delay: 5000
      })
    } catch (error) {
      setToast({ text: 'Error, please try it again!', type: 'error', delay: 5000 })
      if (error) throw error
    }
  }

  return (
    <Grid.Container>
      <Text b>{type === 'setup' ? 'Setups' : 'Mistakes'}</Text>
      <Spacer y={2} />
      <Card style={{ width: '100%' }}>
        <Card.Content>
          <Input
            placeholder="Add with enter..."
            fullWidth
            value={tag}
            onChange={e => setTag(e.target.value)}
            onKeyDown={handleAddSetup}
          />
          <Spacer />
          {trade[type === 'setup' ? 'setups' : 'mistakes'].map(tag => {
            return <TagItem key={tag} type={type} tag={tag} handleDeleteTag={handleDeleteTag} />
          })}
        </Card.Content>
      </Card>
    </Grid.Container>
  )
}

type SetupsProps = {
  type: string
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
  }
  mutate: () => void
}

Tags.propTypes = {
  type: PropTypes.string.isRequired,
  trade: PropTypes.object.isRequired,
  mutate: PropTypes.func.isRequired
}

export default Tags
