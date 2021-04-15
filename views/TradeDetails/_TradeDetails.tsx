// Packages
import { useState } from 'react'
import { useRouter } from 'next/router'
import NextLink from 'next/link'
import useSWR from 'swr'
import axios from 'axios'

// Geist UI
import {
  GeistUIThemes,
  Text,
  Button,
  Spacer,
  Grid,
  Link,
  useToasts,
  Spinner
} from '@geist-ui/react'
import { ArrowLeft as ArrowLeftIcon, Trash as TrashIcon } from '@geist-ui/react-icons'

// Global Utils
import makeStyles from 'utils/makeStyles'

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

// Global Components
import { OrderModal, DeleteTradeModal } from 'components'

// Local Components
import { OrderTable, TradeTable, Notes, Tags } from './components'

const useStyles = makeStyles((ui: GeistUIThemes) => ({
  content: {
    minHeight: 'calc(100vh - 135px)',
    maxWidth: ui.layout.pageWidthWithMargin,
    padding: `calc(${ui.layout.gap} * 2) ${ui.layout.pageMargin} calc(${ui.layout.gap} * 2)`,
    boxSizing: 'border-box',
    margin: '0 auto'
  }
}))

function TradeDetails(): JSX.Element {
  const classes = useStyles()
  const router = useRouter()
  const { id: tradeId } = router.query
  const [, setToast] = useToasts()
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false)
  const [isDeleteTradeModalOpen, setIsDeleteTradeModalOpen] = useState<string | boolean>(false)

  const fetcher = url => axios.get(url).then(res => res.data)
  const { data, error, mutate } = useSWR(`/api/v1/trade/get-trade-by-id/${tradeId}`, fetcher)

  if (error) console.log('failed to load') // eslint-disable-line
  if (!data) console.log('loading') // eslint-disable-line

  async function handleCreateOrder(order) {
    try {
      const changedOrders: {
        _id: string
        side: string
        date: Date
        price: number
        quantity: number
      }[] = [...data.orders, order]

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
        ...data,
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
      setToast({ text: 'You have successfully added a order!', type: 'success', delay: 5000 })
    } catch (error) {
      setToast({ text: 'Error, please try it again!', type: 'error', delay: 5000 })
      if (error) throw error
    }
  }

  async function handleUpdateOrder(order) {
    try {
      const index = data.orders.map(order => order._id).indexOf(order._id)
      const changedOrders = [...data.orders.slice(0, index), order, ...data.orders.slice(index + 1)]

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
        ...data,
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
      setToast({ text: 'You have successfully updated your order!', type: 'success', delay: 5000 })
    } catch (error) {
      setToast({ text: 'Error, please try it again!', type: 'error', delay: 5000 })
      if (error) throw error
    }
  }

  async function handleDeleteOrder(_id: string) {
    try {
      const index = data.orders.map(order => order._id).indexOf(_id)
      const changedOrders = [...data.orders.slice(0, index), ...data.orders.slice(index + 1)]

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
        ...data,
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
      setToast({ text: 'You have successfully deleted your order!', type: 'success', delay: 5000 })
    } catch (error) {
      setToast({ text: 'Error, please try it again!', type: 'error', delay: 5000 })
      if (error) throw error
    }
  }

  async function handleDeleteTrade(tradeId: string) {
    try {
      await axios.post('/api/v1/trade/delete-trade-by-id', { tradeId })
      setIsDeleteTradeModalOpen(false)
      router.push('/trades')
      setToast({ text: 'You have successfully deleted your trade!', type: 'success', delay: 5000 })
    } catch (error) {
      setToast({ text: 'Error, please try it again!', type: 'error', delay: 5000 })
      if (error) throw error
    }
  }

  return !data ? (
    <Grid.Container
      justify="center"
      alignItems="center"
      style={{ minHeight: 'calc(100vh - 135px)' }}
    >
      <Spinner size="large" />
    </Grid.Container>
  ) : (
    <div className={classes.content}>
      <NextLink href="/trades">
        <Link underline color>
          <Grid.Container alignItems="center">
            <ArrowLeftIcon size={16} />
            Trades
          </Grid.Container>
        </Link>
      </NextLink>
      <Spacer />
      <div>
        <Grid.Container alignItems="center" justify="space-between">
          <Text style={{ margin: 0 }} h3>
            {data.symbol} / {data.exchange}{' '}
          </Text>
          <Button
            onClick={() => setIsDeleteTradeModalOpen(tradeId.toString())}
            size="small"
            iconRight={<TrashIcon />}
            auto
          />
        </Grid.Container>
        <Spacer y={0.5} />
        <div style={{ overflow: 'scroll' }}>
          <Grid.Container>
            <TradeTable trade={data} />
          </Grid.Container>
        </div>
        <Spacer y={1} />
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
          <OrderTable
            orders={data.orders}
            handleUpdateOrder={handleUpdateOrder}
            handleDeleteOrder={handleDeleteOrder}
          />
        </div>
      </div>
      {isOrderModalOpen && (
        <OrderModal
          isOrderModalOpen={isOrderModalOpen}
          setIsOrderModalOpen={setIsOrderModalOpen}
          handleCreateOrder={handleCreateOrder}
        />
      )}
      {isDeleteTradeModalOpen && (
        <DeleteTradeModal
          isDeleteTradeModalOpen={isDeleteTradeModalOpen}
          setIsDeleteTradeModalOpen={setIsDeleteTradeModalOpen}
          handleDeleteTrade={handleDeleteTrade}
        />
      )}
      <Spacer y={1} />
      <Grid.Container gap={2}>
        <Grid xs={24} md={12}>
          <Tags type="setup" trade={data} />
        </Grid>
        <Grid xs={24} md={12}>
          <Tags type="mistake" trade={data} />
        </Grid>
      </Grid.Container>
      <Spacer y={1} />
      <Notes trade={data} />
    </div>
  )
}

export default TradeDetails
