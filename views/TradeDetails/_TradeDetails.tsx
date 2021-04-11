// Packages
import { useState } from 'react'
import { useRouter } from 'next/router'
import NextLink from 'next/link'
import useSWR from 'swr'
import { request } from 'graphql-request'
import { useSession } from 'next-auth/client'

// Geist UI
import { GeistUIThemes, Text, Button, Spacer, Grid, Link, useToasts } from '@geist-ui/react'
import { ArrowLeft as ArrowLeftIcon, Trash as TrashIcon } from '@geist-ui/react-icons'

// Utils
import makeStyles from 'utils/makeStyles'

// GraphQL Mutations
import createOrder from 'graphql/mutations/orders/createOrder'
import deleteOrder from 'graphql/mutations/orders/deleteOrder'
import updateOrder from 'graphql/mutations/orders/updateOrder'
import updateTrade from 'graphql/mutations/trades/updateTrade'
import deleteTrade from 'graphql/mutations/trades/deleteTrade'

// GraphQL Queries
import tradeAndOrdersByTradeId from 'graphql/queries/tradeAndOrdersByTradeId'

// Global Components
import { OrderModal, DeleteTradeModal } from 'components'

// Local Components
import { OrderTable, TradeTable } from './components'

const useStyles = makeStyles((ui: GeistUIThemes) => ({
  content: {
    maxWidth: ui.layout.pageWidthWithMargin,
    padding: `calc(${ui.layout.gap} * 2) ${ui.layout.pageMargin} calc(${ui.layout.gap} * 2)`,
    boxSizing: 'border-box',
    margin: '0 auto'
  }
}))

function TradeDetails(): JSX.Element {
  const classes = useStyles()
  const [session] = useSession()
  const router = useRouter()
  const { id: trade_id } = router.query
  const [, setToast] = useToasts()
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false)
  const [isDeleteTradeModalOpen, setIsDeleteTradeModalOpen] = useState<string | boolean>(false)

  const { data, error, mutate } = useSWR([tradeAndOrdersByTradeId, trade_id], (query, trade_id) =>
    request('/api/graphql', query, { trade_id })
  )

  if (error) console.log('failed to load') // eslint-disable-line
  if (!data) console.log('loading') // eslint-disable-line

  async function handleCreateOrder(orderData) {
    try {
      await request('/api/graphql', createOrder, {
        ...orderData,
        user_id: session.user.id,
        trade_id
      })
      mutate()
      handleUpdateTrade()
      setToast({ text: 'You have successfully added a order!', type: 'success', delay: 5000 })
    } catch (error) {
      setToast({ text: 'Error, please try it again!', type: 'error', delay: 5000 })
      if (error) throw error
    }
  }

  async function handleUpdateOrder({ id, side, date, price, quantity }) {
    try {
      await request('/api/graphql', updateOrder, { id, side, date, price, quantity })
      mutate()
      handleUpdateTrade()
      setToast({ text: 'You have successfully updated your order!', type: 'success', delay: 5000 })
    } catch (error) {
      setToast({ text: 'Error, please try it again!', type: 'error', delay: 5000 })
      if (error) throw error
    }
  }

  async function handleDeleteOrder(id: string) {
    try {
      await request('/api/graphql', deleteOrder, { id })
      mutate()
      handleUpdateTrade()
      setToast({ text: 'You have successfully deleted your order!', type: 'success', delay: 5000 })
    } catch (error) {
      setToast({ text: 'Error, please try it again!', type: 'error', delay: 5000 })
      if (error) throw error
    }
  }

  async function handleUpdateTrade() {
    try {
      await request('/api/graphql', updateTrade, { id: trade_id })
      mutate()
    } catch (error) {
      setToast({ text: 'Error, please try it again!', type: 'error', delay: 5000 })
      if (error) throw error
    }
  }

  async function handleDeleteTrade(id: string) {
    try {
      await request('/api/graphql', deleteTrade, { id })
      setIsDeleteTradeModalOpen(false)
      router.push('/trades')
      setToast({ text: 'You have successfully deleted your trade!', type: 'success', delay: 5000 })
    } catch (error) {
      setToast({ text: 'Error, please try it again!', type: 'error', delay: 5000 })
      if (error) throw error
    }
  }

  return !data ? (
    <Text>Loading</Text>
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
            {data.tradeByTradeId[0].symbol} / {data.tradeByTradeId[0].exchange}{' '}
          </Text>
          <Button
            onClick={() => setIsDeleteTradeModalOpen(trade_id.toString())}
            size="small"
            iconRight={<TrashIcon />}
            auto
          />
        </Grid.Container>

        <Spacer y={0.5} />

        <div style={{ overflow: 'scroll' }}>
          <Grid.Container>
            <TradeTable trade={data.tradeByTradeId[0]} />
          </Grid.Container>
        </div>
        <Spacer y={3} />

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
            orders={data.ordersByTradeId}
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
    </div>
  )
}

export default TradeDetails
