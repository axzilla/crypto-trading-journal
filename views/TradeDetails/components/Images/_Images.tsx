// Packages
import PropTypes from 'prop-types'
// import axios from 'axios'

// Geist UI
// import { Text, Card, useToasts, Spacer, Grid, Button } from '@geist-ui/react'
import { Text, Card, Spacer, Grid, Button } from '@geist-ui/react'

function Images({ trade }: SetupsProps): JSX.Element {
  // const [, setToast] = useToasts()

  console.log(trade) // eslint-disable-line

  // async function handleAddImage() {
  //   try {
  //     // await axios.post('/api/v1/trade/update-trade', { changedTrade })
  //     setToast({ text: 'Image saved successfully!', type: 'success', delay: 5000 })
  //   } catch (error) {
  //     setToast({ text: 'Error, please try it again!', type: 'error', delay: 5000 })
  //     if (error) throw error
  //   }
  // }

  // async function handleDeleteImage() {
  //   try {
  //     // await axios.post('/api/v1/trade/update-trade', { changedTrade })
  //     setToast({ text: 'Image saved successfully!', type: 'success', delay: 5000 })
  //   } catch (error) {
  //     setToast({ text: 'Error, please try it again!', type: 'error', delay: 5000 })
  //     if (error) throw error
  //   }
  // }

  return (
    <Card style={{ width: '100%' }}>
      <Card.Content>
        <Grid.Container justify="space-between">
          <Text b>Images</Text>
          <Button size="small" auto>
            Add Image
          </Button>
        </Grid.Container>
        <Spacer />
        <Grid.Container gap={2}>
          {new Array(7).fill('').map(() => {
            return (
              <Grid key={Math.random()} xs={6} style={{ height: 100 }}>
                <img alt="" height="100%" src="https://source.unsplash.com/random" />
              </Grid>
            )
          })}
        </Grid.Container>
        {/* <Card style={{ height: 100, width: 100 }}>
          <Grid.Container>Add Image</Grid.Container>
        </Card>
        <Spacer /> */}
      </Card.Content>
    </Card>
  )
}

type SetupsProps = {
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

Images.propTypes = {
  trade: PropTypes.object.isRequired
}

export default Images
