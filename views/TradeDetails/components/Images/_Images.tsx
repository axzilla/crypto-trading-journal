// Packages
import PropTypes from 'prop-types'
// import axios from 'axios'

// Geist UI
// import { Text, Card, useToasts, Spacer, Grid, Button } from '@geist-ui/react'
import { Text, Card, Spacer, Grid, Button, Image } from '@geist-ui/react'
import { Trash as TrashIcon } from '@geist-ui/react-icons'

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
          {[
            'https://images.unsplash.com/photo-1593642533144-3d62aa4783ec?ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
            'https://images.unsplash.com/photo-1618450684024-55f2d7b7740a?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=934&q=80',
            'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
            'https://www.tradingview.com/x/LcUcHZYB/',
            'https://www.tradingview.com/x/LcUcHZYB/',
            'https://www.tradingview.com/x/LcUcHZYB/'
          ].map(image => {
            return (
              <Grid key={Math.random()} xs={12} md={6}>
                <Card
                  style={{
                    background:
                      'url(https://www.hotelmedici.com/images/slide_home/11_Fori_imperiali_1600X917.jpg)',
                    backgroundSize: 'cover',
                    width: '100%',
                    height: 200,
                    position: 'relative'
                  }}
                >
                  <Button
                    style={{ position: 'absolute', top: 0, right: 0, margin: 5 }}
                    size="small"
                    auto
                    iconRight={<TrashIcon />}
                  />
                </Card>
              </Grid>
            )
          })}
        </Grid.Container>
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
