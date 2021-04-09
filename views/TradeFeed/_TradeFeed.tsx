// Packages
import { useState, useEffect } from 'react'
import axios from 'axios'
import useSWR from 'swr'
import { useRouter } from 'next/router'
import { request } from 'graphql-request'
import { useSession } from 'next-auth/client'

// Geist UI
import { GeistUIThemes, Button, Modal, Table, Tag, Spacer, Text, Grid } from '@geist-ui/react'
import { Trash as TrashIcon, Eye as EyeIcon } from '@geist-ui/react-icons'

// Components Global
import { TradeModal } from '../../components'

// Utils
import makeStyles from 'utils/makeStyles'
import nbs from 'utils/nbs'

const useStyles = makeStyles((ui: GeistUIThemes) => ({
  content: {
    display: 'flex',
    flexDirection: 'row',
    width: ui.layout.pageWidthWithMargin,
    maxWidth: '100%',
    padding: `calc(${ui.layout.gap} * 2) ${ui.layout.pageMargin} calc(${ui.layout.gap} * 2)`,
    boxSizing: 'border-box',
    margin: '0 auto'
  },
  name: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    flex: 1
  },
  title: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  username: {
    lineHeight: 1
  },
  integrationsTitle: {
    textTransform: 'uppercase',
    color: `${ui.palette.accents_5} !important`,
    fontWeight: 500,
    fontSize: 12,
    margin: 0
  },
  integrationsUsername: {
    margin: '0 0 0 4px',
    fontWeight: 0
  }
}))

function TradeFeed(): JSX.Element {
  const classes = useStyles()
  const router = useRouter()
  const [session] = useSession()
  const [isTradeModalOpen, setIsTradeModalOpen] = useState(false)
  const [isDeleteTradeModalOpen, setIsDeleteTradeModalOpen] = useState(false)
  const [exchangesAll, setExchangesAll] = useState([])
  const [exchangesRelated, setExchangesRelated] = useState([])
  const [tradeData, setTradeData] = useState({
    exchange: '',
    symbol: '',
    date: null,
    price: '',
    quantity: '',
    fee: '',
    action: ''
  })

  const TRADES_AND_ORDERS_BY_USER_ID = /* GraphQL */ `
    query tradesAndOrderByUserId($user_id: String!) {
      tradesByUserId(user_id: $user_id) {
        id
        user_id
        symbol
        exchange
        status
        created_at
      }

      ordersByUserId(user_id: $user_id) {
        id
        user_id
        trade_id
        action
        date
        price
        quantity
        fee
        created_at
      }
    }
  `

  const CREATE_TRADE_MUTATION = /* GraphQL */ `
    mutation createTrade(
      $user_id: String!
      $symbol: String!
      $exchange: String!
      $action: String!
      $date: String!
      $price: String!
      $quantity: String!
      $fee: String!
    ) {
      createTrade(
        user_id: $user_id
        symbol: $symbol
        exchange: $exchange
        action: $action
        date: $date
        price: $price
        quantity: $quantity
        fee: $fee
      ) {
        symbol
      }
    }
  `

  const DELETE_TRADE_MUTATION = /* GraphQL */ `
    mutation deleteTrade($id: String!) {
      deleteTrade(id: $id) {
        id
      }
    }
  `

  const user_id = session.user.id

  const { data, error, mutate } = useSWR(
    [TRADES_AND_ORDERS_BY_USER_ID, user_id],
    (query, user_id) => request('/api/graphql', query, { user_id })
  )

  if (error) console.log('failed to load') // eslint-disable-line
  if (!data) console.log('loading') // eslint-disable-line

  useEffect(() => {
    handleGetExchanges()
  }, [])

  async function handleGetExchanges() {
    const url = 'https://api.coinmarketcap.com/data-api/v3/map/all?listing_status=active,untracked'
    const {
      data: {
        data: { exchangeMap }
      }
    } = await axios.get(url)

    setExchangesAll(
      exchangeMap.map(exchange => {
        return { label: exchange.name, value: exchange.name }
      })
    )
  }

  function resetForm() {
    setTradeData({
      exchange: '',
      symbol: '',
      date: null,
      price: '',
      quantity: '',
      fee: '',
      action: ''
    })
  }

  async function handleCreateTrade() {
    try {
      await request('/api/graphql', CREATE_TRADE_MUTATION, {
        ...tradeData,
        user_id: session.user.id
      })

      setIsTradeModalOpen(false)
      resetForm()
      mutate()
    } catch (error) {
      if (error) throw error
    }
  }

  async function handleDeleteTrade(id) {
    try {
      await request('/api/graphql', DELETE_TRADE_MUTATION, { id })
      mutate()
      setIsDeleteTradeModalOpen(false)
    } catch (error) {
      if (error) throw error
    }
  }

  return (
    <>
      <div className={classes.content}>
        <div className={classes.name}>
          <div className={classes.title}>
            <Button onClick={() => setIsTradeModalOpen(true)} type="secondary" auto>
              Add Trade
            </Button>
          </div>
        </div>
      </div>

      <div style={{ overflow: 'scroll' }} className={classes.content}>
        <Table
          data={
            data &&
            data.tradesByUserId
              .sort((a, b) => b.created_at - a.created_at)
              .map(trade => {
                // const { exchange, symbol, action, price, quantity, fee, date, status, id } = trade
                const { exchange, symbol, status, id } = trade

                return {
                  exchange: nbs(exchange),
                  symbol: <Tag type="success">{symbol.toUpperCase()}</Tag>,
                  status: (
                    <Tag invert type="warning">
                      {status.toUpperCase()}
                    </Tag>
                  ),
                  actions: (
                    <Grid.Container wrap="nowrap">
                      <Button
                        onClick={() => setIsDeleteTradeModalOpen(id)}
                        iconRight={<TrashIcon />}
                        auto
                        size="small"
                      />
                      <Spacer x={0.5} />
                      <Button
                        onClick={() => router.push(`/trades/${id}`)}
                        iconRight={<EyeIcon />}
                        auto
                        size="small"
                      />
                    </Grid.Container>
                  )
                }
              })
          }
        >
          <Table.Column prop="symbol" label="symbol" />
          <Table.Column prop="exchange" label="exchange" />
          <Table.Column prop="status" label="status" />
          <Table.Column prop="actions" />
        </Table>
      </div>

      <TradeModal
        isTradeModalOpen={isTradeModalOpen}
        setIsTradeModalOpen={setIsTradeModalOpen}
        tradeData={tradeData}
        setTradeData={setTradeData}
        exchangesRelated={exchangesRelated}
        setExchangesRelated={setExchangesRelated}
        exchangesAll={exchangesAll}
        handleCreateTrade={handleCreateTrade}
      />

      <Modal open={isDeleteTradeModalOpen} onClose={() => setIsDeleteTradeModalOpen(false)}>
        <Modal.Title>Delete Trade</Modal.Title>
        <Modal.Subtitle>This trade will be deleted.</Modal.Subtitle>
        <Modal.Content>
          <Text type="error" style={{ textAlign: 'center' }}>
            Warning: This action is not reversible. Please be certain.
          </Text>
        </Modal.Content>
        <Modal.Action passive onClick={() => setIsDeleteTradeModalOpen(false)}>
          Cancel
        </Modal.Action>
        <Modal.Action onClick={() => handleDeleteTrade(isDeleteTradeModalOpen)}>
          Delete Trade
        </Modal.Action>
      </Modal>
    </>
  )
}

export default TradeFeed
