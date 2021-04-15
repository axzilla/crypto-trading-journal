// Packages
import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'

// Geist UI
import { Text, Card, useToasts, Spacer, Tag, Modal } from '@geist-ui/react'

// Components UI
import { Input } from 'components-ui'

function TagItem({ type, tag, handleDeleteTag }: TagItemProps) {
  const [isDeleteTagModal, setIsDeleteTagModal] = useState(false)

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
            setIsDeleteTagModal(false)
            handleDeleteTag(tag)
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

function Tags({ trade, type }: SetupsProps): JSX.Element {
  const [, setToast] = useToasts()
  const [tag, setTag] = useState('')
  const [tags, setTags] = useState([])

  useEffect(() => {
    if (type === 'setup') {
      setTags(trade.setups)
    }

    if (type === 'mistake') {
      setTags(trade.mistakes)
    }
  }, [])

  async function handleAddSetup(e) {
    try {
      if (e.target.value && e.key === 'Enter') {
        setTag('')

        if (!tags.includes(e.target.value)) {
          const newtags: string[] = [...tags, e.target.value]
          setTags(newtags)

          const changedTrade = { ...trade, [type === 'setup' ? 'setups' : 'mistakes']: newtags }
          await axios.post('/api/v1/trade/update-trade', { changedTrade })
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

  async function handleDeleteTag(setup) {
    try {
      const index = tags.indexOf(setup)
      const newtags: string[] = [...tags.slice(0, index), ...tags.slice(index + 1)]
      setTags(newtags)
      const changedTrade = { ...trade, [type === 'setup' ? 'setups' : 'mistakes']: newtags }
      await axios.post('/api/v1/trade/update-trade', { changedTrade })
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
    <Card style={{ width: '100%' }}>
      <Card.Content>
        <Text b>{type === 'setup' ? 'Setups' : 'Mistakes'}</Text>
        <Spacer />
        <Input
          placeholder="Add with enter..."
          fullWidth
          value={tag}
          onChange={e => setTag(e.target.value)}
          onKeyDown={handleAddSetup}
        />
        <Spacer />
        {tags.map(tag => {
          return <TagItem key={tag} type={type} tag={tag} handleDeleteTag={handleDeleteTag} />
        })}
      </Card.Content>
    </Card>
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
}

Tags.propTypes = {
  type: PropTypes.string.isRequired,
  trade: PropTypes.object.isRequired
}

export default Tags
