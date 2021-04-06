// Packages
import { useState, useEffect } from 'react'
import axios from 'axios'
import useSWR from 'swr'
import { request } from 'graphql-request'
import moment from 'moment'
import { useSession } from 'next-auth/client'

// Geist UI
import { GeistUIThemes, Button, Modal, Table, Tag, Spacer, Text } from '@geist-ui/react'
import { Trash as TrashIcon, Edit as EditIcon } from '@geist-ui/react-icons'

// Components Global
import { TradeModal } from '../../components'

// Utils
import makeStyles from '../../utils/makeStyles'

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

function Header(): JSX.Element {
  const classes = useStyles()
  const [session] = useSession()
  const [isTradeModalOpen, setIsTradeModalOpen] = useState(false)
  const [isDeleteTradeModalOpen, setIsDeleteTradeModalOpen] = useState(false)

  const [exchangesAll, setExchangesAll] = useState([])
  const [exchangesRelated, setExchangesRelated] = useState([])

  const [exchange, setExchange] = useState('')
  const [symbol, setSymbol] = useState('')
  const [date, setDate] = useState('')
  const [price, setPrice] = useState('')
  const [quantity, setQuantity] = useState('')
  const [fee, setFee] = useState('')
  const [action, setAction] = useState('')

  const TRADES_BY_USER_QUERY = /* GraphQL */ `
    query tradesByUser($user: String!) {
      tradesByUser(user: $user) {
        uuid
        user
        id
        symbol
        exchange
        action
        date
        price
        quantity
        fee
        status
        date_created
      }
    }
  `

  const CREATE_TRADE_MUTATION = /* GraphQL */ `
    mutation createTrade(
      $user: String!
      $symbol: String!
      $exchange: String!
      $action: String!
      $date: String!
      $price: String!
      $quantity: String!
      $fee: String!
    ) {
      createTrade(
        user: $user
        symbol: $symbol
        exchange: $exchange
        action: $action
        date: $date
        price: $price
        quantity: $quantity
        fee: $fee
      ) {
        user
        symbol
        exchange
        action
        date
        price
        quantity
        fee
        status
      }
    }
  `

  const DELETE_TRADE_MUTATION = /* GraphQL */ `
    mutation deleteTrade($uuid: String!) {
      deleteTrade(uuid: $uuid) {
        uuid
      }
    }
  `

  const user = session.user.uuid

  const { data, error, mutate } = useSWR([TRADES_BY_USER_QUERY, user], (query, user) =>
    request('/api/graphql', query, { user })
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
    setExchange('')
    setSymbol('')
    setDate('')
    setPrice('')
    setQuantity('')
    setFee('')
    setAction('')
  }

  async function handleCreateTrade() {
    try {
      const tradeData = {
        user: session.user.uuid,
        exchange,
        symbol,
        date,
        price,
        quantity,
        fee,
        action
      }

      const { createTrade } = await request('/api/graphql', CREATE_TRADE_MUTATION, tradeData)

      setIsTradeModalOpen(false)
      resetForm()
      mutate()
      console.log(createTrade) // eslint-disable-line
    } catch (error) {
      if (error) throw error
    }
  }

  async function handleDeleteTrade(uuid) {
    try {
      await request('/api/graphql', DELETE_TRADE_MUTATION, { uuid })
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
            data.tradesByUser
              .sort((a, b) => b.date_created - a.date_created)
              .map(trade => {
                const { exchange, symbol, action, price, quantity, fee, date, status, uuid } = trade

                return {
                  exchange,
                  symbol: <Tag type="success">{symbol.toUpperCase()}</Tag>,
                  action: <Tag type="warning">{action.toUpperCase()}</Tag>,
                  price,
                  quantity,
                  fee,
                  date: moment
                    .unix(date / 1000)
                    .utc()
                    .format('MMMM D, YYYY, h:mm'),
                  status: (
                    <Tag invert type="warning">
                      {status.toUpperCase()}
                    </Tag>
                  ),
                  actions: (
                    <>
                      <Button
                        onClick={() => setIsDeleteTradeModalOpen(uuid)}
                        iconRight={<TrashIcon />}
                        auto
                        size="small"
                      />
                      <Spacer x={0.5} />
                      <Button iconRight={<EditIcon />} auto size="small" />
                    </>
                  )
                }
              })
          }
        >
          <Table.Column prop="symbol" label="symbol" />
          <Table.Column prop="exchange" label="exchange" />
          <Table.Column prop="action" label="action" />
          <Table.Column prop="price" label="price" />
          <Table.Column prop="quantity" label="quantity" />
          <Table.Column prop="fee" label="fee" />
          <Table.Column prop="date" label="date" />
          <Table.Column prop="status" label="status" />
          <Table.Column prop="actions" label="actions" />
        </Table>
      </div>

      {/* Create Trade Modal */}
      <TradeModal
        isTradeModalOpen={isTradeModalOpen}
        setIsTradeModalOpen={setIsTradeModalOpen}
        //
        action={action}
        exchange={exchange}
        symbol={symbol}
        date={date}
        price={price}
        quantity={quantity}
        fee={fee}
        //
        setAction={setAction}
        setExchange={setExchange}
        setSymbol={setSymbol}
        setDate={setDate}
        setPrice={setPrice}
        setQuantity={setQuantity}
        setFee={setFee}
        //
        exchangesRelated={exchangesRelated}
        setExchangesRelated={setExchangesRelated}
        //
        exchangesAll={exchangesAll}
        //
        handleCreateTrade={handleCreateTrade}
      />

      {/* Delete Trade Modal */}
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

export default Header
