// Packages
import { useState } from 'react'
import { useRouter } from 'next/router'
import useSWR from 'swr'
import { request } from 'graphql-request'
import { useSession } from 'next-auth/client'

// Geist UI
import { GeistUIThemes, Text, Button, Spacer, Grid } from '@geist-ui/react'

// Utils
import makeStyles from 'utils/makeStyles'

// Global Components
import { OrderModal } from 'components'

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
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false)

  const TRADE_AND_ORDERS_BY_TRADE_ID = /* GraphQL */ `
    query tradeAndOrdersByTradeId($trade_id: String!) {
      tradeByTradeId(id: $trade_id) {
        id
        user_id
        symbol
        status
        exchange
        created_at
      }
      ordersByTradeId(trade_id: $trade_id) {
        id
        user_id
        trade_id
        action
        date
        price
        quantity
        created_at
      }
    }
  `

  const { data, error, mutate } = useSWR(
    [TRADE_AND_ORDERS_BY_TRADE_ID, trade_id],
    (query, trade_id) => request('/api/graphql', query, { trade_id })
  )

  if (error) console.log('failed to load') // eslint-disable-line
  if (!data) console.log('loading') // eslint-disable-line

  async function handleCreateOrder(orderData) {
    const CREATE_ORDER_MUTATION = /* GraphQL */ `
      mutation createOrder(
        $user_id: String!
        $trade_id: String!
        $action: String!
        $date: String!
        $price: String!
        $quantity: String!
      ) {
        createOrder(
          user_id: $user_id
          trade_id: $trade_id
          action: $action
          date: $date
          price: $price
          quantity: $quantity
        ) {
          id
          user_id
          trade_id
          action
          date
          price
          quantity
        }
      }
    `

    await request('/api/graphql', CREATE_ORDER_MUTATION, {
      ...orderData,
      user_id: session.user.id,
      trade_id
    })

    mutate()
  }

  async function handleUpdateOrder({ id, action, date, price, quantity }) {
    const UPDATE_ORDER_MUTATION = /* GraphQL */ `
      mutation updateOrder(
        $id: String!
        $action: String!
        $date: String!
        $price: String!
        $quantity: String!
      ) {
        updateOrder(id: $id, action: $action, date: $date, price: $price, quantity: $quantity) {
          id
          action
          date
          price
          quantity
        }
      }
    `

    await request('/api/graphql', UPDATE_ORDER_MUTATION, { id, action, date, price, quantity })
    mutate()
  }

  async function handleDeleteOrder(id) {
    const DELETE_ORDER_MUTATION = /* GraphQL */ `
      mutation deleteOrder($id: String!) {
        deleteOrder(id: $id) {
          id
        }
      }
    `

    await request('/api/graphql', DELETE_ORDER_MUTATION, { id })
    mutate()
  }

  return !data ? (
    <Text>Loading</Text>
  ) : (
    <div className={classes.content}>
      <div>
        <Grid.Container alignItems="center">
          <Text style={{ margin: 0 }} h3>
            {data.tradeByTradeId[0].symbol}:{data.tradeByTradeId[0].exchange}{' '}
          </Text>
        </Grid.Container>

        <Spacer />

        <div style={{ overflow: 'scroll' }}>
          <Grid.Container>
            <TradeTable trade={data.tradeByTradeId[0]} orders={data.ordersByTradeId} />
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
    </div>
  )
}

export default TradeDetails
