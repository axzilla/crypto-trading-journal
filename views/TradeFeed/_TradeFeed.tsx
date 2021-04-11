// Packages
import { useState, useEffect } from 'react'
import axios from 'axios'
import useSWR from 'swr'
import { useRouter } from 'next/router'
import { request } from 'graphql-request'
import { useSession } from 'next-auth/client'

// Geist UI
import { GeistUIThemes, Button, Table, Tag, useToasts, Text } from '@geist-ui/react'

// Components Global
import { TradeModal, DeleteTradeModal } from '../../components'

// Utils
import makeStyles from 'utils/makeStyles'
import nbs from 'utils/nbs'
import formatCurrency from '@utils/formatCurrency'
import formatQuantity from '@utils/formatQuantity'

// GraphQL Mutations
import createTrade from 'graphql/mutations/trades/createTrade'
import deleteTrade from 'graphql/mutations/trades/deleteTrade'

// GraphQL Queries
import tradesByUserId from 'graphql/queries/tradesByUserId'

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
  const [, setToast] = useToasts()
  const [isTradeModalOpen, setIsTradeModalOpen] = useState(false)
  const [isDeleteTradeModalOpen, setIsDeleteTradeModalOpen] = useState<string | boolean>(false)
  const [exchangesAll, setExchangesAll] = useState([])
  const [exchangesRelated, setExchangesRelated] = useState([])
  const [tradeData, setTradeData] = useState({
    // Trade
    exchange: '',
    symbol: '',
    // Inital order
    date: null,
    price: '',
    quantity: '',
    side: ''
  })

  const user_id = session.user.id

  const { data, error, mutate } = useSWR([tradesByUserId, user_id], (query, user_id) =>
    request('/api/graphql', query, { user_id })
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
      // Trade
      exchange: '',
      symbol: '',
      // Inital order
      date: null,
      price: '',
      quantity: '',
      side: ''
    })
  }

  async function handleCreateTrade() {
    try {
      await request('/api/graphql', createTrade, {
        ...tradeData,
        user_id: session.user.id,
        quantity_total: tradeData.quantity,
        quantity_open: tradeData.quantity,
        cost: (Number(tradeData.quantity) * Number(tradeData.price)).toString(),
        avg_entry: tradeData.price
      })

      setIsTradeModalOpen(false)
      resetForm()
      mutate()
      setToast({ text: 'You have successfully added a trade!', type: 'success', delay: 5000 })
    } catch (error) {
      setToast({ text: 'Error, please try it again!', type: 'error', delay: 5000 })
      if (error) throw error
    }
  }

  async function handleDeleteTrade(id) {
    try {
      await request('/api/graphql', deleteTrade, { id })
      mutate()
      setIsDeleteTradeModalOpen(false)
      setToast({ text: 'You have successfully deleted your trade!', type: 'success', delay: 5000 })
    } catch (error) {
      setToast({ text: 'Error, please try it again!', type: 'error', delay: 5000 })
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
          onRow={trade => router.push(`/trades/${trade.id}`)}
          data={
            data &&
            data.tradesByUserId
              .sort((a, b) => b.created_at - a.created_at)
              .map(trade => {
                const {
                  id,
                  exchange,
                  symbol,
                  status,
                  side,
                  cost,
                  quantity_open,
                  quantity_total,
                  avg_entry,
                  avg_exit,
                  return_percent,
                  return_total
                }: {
                  id: string
                  status: string
                  symbol: string
                  exchange: string
                  side: string
                  cost: string
                  quantity_open: string
                  quantity_total: string
                  avg_entry: string
                  avg_exit: string
                  return_percent: string
                  return_total: string
                } = trade

                return {
                  id,
                  symbol: (
                    <Tag invert type="warning">
                      {symbol.toUpperCase()}
                    </Tag>
                  ),
                  exchange: nbs(exchange),
                  side: <Tag type="warning">{side.toUpperCase()}</Tag>,
                  quantityTotal: formatQuantity(Number(quantity_total)),
                  quantityOpen: formatQuantity(Number(quantity_open)),
                  cost: formatCurrency(Number(cost)),
                  avgEntryPrice: formatCurrency(Number(avg_entry)),
                  avgExitPrice: formatCurrency(Number(avg_exit)),
                  returnTotal: (
                    <Text type={status === 'WINNER' || return_total >= '0' ? 'warning' : 'error'}>
                      {formatCurrency(Number(return_total))}
                    </Text>
                  ),
                  returnPercent: (
                    <Text type={status === 'WINNER' || return_percent >= '0' ? 'warning' : 'error'}>
                      {return_percent} %
                    </Text>
                  ),
                  result: (
                    <Tag invert type="warning">
                      {status}
                    </Tag>
                  )
                }
              })
          }
        >
          <Table.Column prop="symbol" label="Symbol" />
          <Table.Column prop="exchange" label="Exchange" />
          <Table.Column prop="side" label="Side" />
          <Table.Column prop="quantityTotal" label={nbs('Qty Total')} />
          <Table.Column prop="quantityOpen" label={nbs('Qty Open')} />
          <Table.Column prop="cost" label="Cost" />
          <Table.Column prop="avgEntryPrice" label={nbs('Avg Entry')} />
          <Table.Column prop="avgExitPrice" label={nbs('Avg Exit')} />
          <Table.Column prop="returnTotal" label={nbs('Return $')} />
          <Table.Column prop="returnPercent" label={nbs('Return %')} />
          <Table.Column prop="result" label="Result" />
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
      {isDeleteTradeModalOpen && (
        <DeleteTradeModal
          isDeleteTradeModalOpen={isDeleteTradeModalOpen}
          setIsDeleteTradeModalOpen={setIsDeleteTradeModalOpen}
          handleDeleteTrade={handleDeleteTrade}
        />
      )}
    </>
  )
}

export default TradeFeed
