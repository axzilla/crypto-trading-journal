// Packages
import { useState } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'

// Local Utils
import {
  getCost,
  getSide,
  getAvgEntry,
  getAvgExit,
  getQuantityOpen,
  getQuantityTotal,
  getReturnPercent,
  getReturnTotal,
  getStatus
} from './utils'

// Geist UI
import { Grid, Button, Spacer, Text, useToasts } from '@geist-ui/react'

// Local Components
import { Item } from './components'

// Global Components
import { OrderModal } from 'components'

function Orders({ trade, mutate }: OrdersProps): JSX.Element {
  const [, setToast] = useToasts()
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false)

  async function handleCrdOrder(
    order: { date: Date; side: string; price: number; quantity: number; _id: string },
    type
  ) {
    try {
      let changedOrders: {
        _id: string
        side: string
        date: Date
        price: number
        quantity: number
      }[]

      let toastMessage: string

      if (type === 'create') {
        changedOrders = [...trade.orders, order]
        toastMessage = 'Order added successfully!'
      }

      if (type === 'update') {
        const index = trade.orders.map(order => order._id).indexOf(order._id)
        changedOrders = [...trade.orders.slice(0, index), order, ...trade.orders.slice(index + 1)]
        toastMessage = 'Order updated successfully!'
      }

      if (type === 'delete') {
        const index = trade.orders.map(order => order._id).indexOf(order._id)
        changedOrders = [...trade.orders.slice(0, index), ...trade.orders.slice(index + 1)]
        toastMessage = 'Order deleted successfully'
      }

      const side = getSide(changedOrders)
      const quantityTotal = getQuantityTotal(changedOrders, side)
      const quantityOpen = getQuantityOpen(changedOrders, side)
      const cost = getCost(changedOrders)
      const avgEntry = getAvgEntry(changedOrders, side)
      const avgExit = getAvgExit(changedOrders, side)
      const returnTotal = getReturnTotal(avgEntry, avgExit, side, changedOrders)
      const returnPercent = getReturnPercent(cost, returnTotal)
      const status = getStatus(quantityOpen, avgEntry, avgExit, side)

      const changedTrade = {
        ...trade,
        side,
        quantityTotal,
        quantityOpen,
        cost,
        avgEntry,
        avgExit,
        returnTotal,
        returnPercent,
        status,
        orders: changedOrders
      }

      await axios.post('/api/v1/trade/update-trade', { changedTrade })
      mutate()
      setToast({ text: toastMessage, type: 'success', delay: 5000 })
    } catch (error) {
      setToast({ text: 'Error, please try it again!', type: 'error', delay: 5000 })
      if (error) throw error
    }
  }

  return (
    <>
      <Grid.Container justify="space-between" alignItems="flex-end">
        <Text style={{ margin: 0 }} h5>
          Orders
        </Text>
        <Button onClick={() => setIsOrderModalOpen(true)} size="small" auto>
          Add Order
        </Button>
      </Grid.Container>
      <Spacer />
      <Grid.Container gap={1}>
        {trade.orders
          .sort((a, b): number => {
            if (new Date(a.date) < new Date(b.date)) return -1
            else if (new Date(a.date) > new Date(b.date)) return 1
            else return 0
          })
          .map((order, index) => {
            return (
              <Grid xs={24} key={index}>
                <Item
                  order={order}
                  handleCrdOrder={handleCrdOrder}
                  isLastItem={trade.orders.length < 2}
                />
              </Grid>
            )
          })}
      </Grid.Container>

      <OrderModal
        isOrderModalOpen={isOrderModalOpen}
        setIsOrderModalOpen={setIsOrderModalOpen}
        handleCrdOrder={handleCrdOrder}
      />
    </>
  )
}

type OrdersProps = {
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
  mutate: () => void
}

Orders.propTypes = {
  trade: PropTypes.object.isRequired,
  mutate: PropTypes.func.isRequired
}

export default Orders
