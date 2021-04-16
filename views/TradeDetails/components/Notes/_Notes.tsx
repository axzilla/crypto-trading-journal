// Packages
import { useState } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'

// Geist UI
import { Text, Card, useToasts, Spacer } from '@geist-ui/react'

// Components UI
import { Textarea } from 'components-ui'

function Notes({ trade }: NotesProps): JSX.Element {
  const [notes, setNotes] = useState(trade.notes || '')
  const [, setToast] = useToasts()

  async function handleUpdateNotes() {
    try {
      const changedTrade = { ...trade, notes }
      await axios.post('/api/v1/trade/update-trade', { changedTrade })
      setToast({ text: 'Notes saved successfully!', type: 'success', delay: 5000 })
    } catch (error) {
      setToast({ text: 'Error, please try it again!', type: 'error', delay: 5000 })
      if (error) throw error
    }
  }

  return (
    <Card>
      <Card.Content>
        <Text b>Notes</Text>
        <Spacer />
        <Textarea
          placeholder="Type here your notes..."
          onBlur={handleUpdateNotes}
          fullWidth
          value={notes}
          onChange={e => setNotes(e.target.value)}
        />
      </Card.Content>
    </Card>
  )
}

type NotesProps = {
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
  }
}

Notes.propTypes = {
  trade: PropTypes.object.isRequired
}

export default Notes
