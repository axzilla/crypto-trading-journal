// Packages
import { useState } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
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
import { Table, Tag, Grid, Button, Spacer, Card, Text, useToasts } from '@geist-ui/react'
import { Trash as TrashIcon } from '@geist-ui/react-icons'

// Local Components
import { EditOrder } from './components'

// Global Components
import { OrderModal } from 'components'

// Utils
import nbs from 'utils/nbs'
import formatCurrency from '@utils/formatCurrency'
import formatQuantity from 'utils/formatQuantity'

function OrderTable({ trade, mutate }: OrderTableProps): JSX.Element {
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
        toastMessage = 'You have successfully added a order!'
      }

      if (type === 'update') {
        const index = trade.orders.map(order => order._id).indexOf(order._id)
        changedOrders = [...trade.orders.slice(0, index), order, ...trade.orders.slice(index + 1)]
        toastMessage = 'You have successfully updated your order!'
      }

      if (type === 'delete') {
        const index = trade.orders.map(order => order._id).indexOf(order._id)
        changedOrders = [...trade.orders.slice(0, index), ...trade.orders.slice(index + 1)]
        toastMessage = 'You have successfully deleted your order!'
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
      <Card>
        <Grid.Container justify="space-between" alignItems="flex-end">
          <Text style={{ margin: 0 }} h5>
            History
          </Text>
          <Button onClick={() => setIsOrderModalOpen(true)} size="small" auto>
            Add Order
          </Button>
        </Grid.Container>
        <Spacer y={0.5} />
        <div style={{ overflow: 'scroll' }}>
          <Table
            data={trade.orders
              .sort((a, b): number => {
                if (new Date(a.date) < new Date(b.date)) return -1
                else if (new Date(a.date) > new Date(b.date)) return 1
                else return 0
              })
              .map(order => {
                const { side, price, quantity, date } = order

                return {
                  side: <Tag type="warning">{side.toUpperCase()}</Tag>,
                  quantity: formatQuantity(quantity),
                  price: formatCurrency(price),
                  value: formatCurrency(price * quantity),
                  date: nbs(moment(date).format('MMMM D, YYYY, h:mm')),
                  actions: (
                    <Grid.Container wrap="nowrap">
                      <Button
                        disabled={trade.orders.length < 2}
                        onClick={() => handleCrdOrder(order, 'delete')}
                        iconRight={<TrashIcon />}
                        auto
                        size="small"
                      />
                      <Spacer y={0.5} />
                      <EditOrder order={order} handleCrdOrder={handleCrdOrder} />
                    </Grid.Container>
                  )
                }
              })}
          >
            <Table.Column prop="side" label="Side" />
            <Table.Column prop="quantity" label="Quantity" />
            <Table.Column prop="price" label="Price" />
            <Table.Column prop="value" label="Value" />
            <Table.Column prop="date" label="Date" />
            <Table.Column prop="actions" label="actions" />
          </Table>
        </div>
      </Card>

      <OrderModal
        isOrderModalOpen={isOrderModalOpen}
        setIsOrderModalOpen={setIsOrderModalOpen}
        handleCrdOrder={handleCrdOrder}
      />
    </>
  )
}

type OrderTableProps = {
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

OrderTable.propTypes = {
  trade: PropTypes.object.isRequired,
  mutate: PropTypes.func.isRequired
}

export default OrderTable
