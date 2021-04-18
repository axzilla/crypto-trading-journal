// Packages
import { useState, useEffect } from 'react'
import axios from 'axios'
import useSWR from 'swr'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/client'

// Geist UI
import {
  GeistUIThemes,
  Button,
  Table,
  Tag,
  useToasts,
  Text,
  Spinner,
  Grid,
  Spacer
} from '@geist-ui/react'

// Components Global
import { TradeModal } from '../../components'

// Utils
import makeStyles from 'utils/makeStyles'
import nbs from 'utils/nbs'
import formatCurrency from '@utils/formatCurrency'
import formatQuantity from '@utils/formatQuantity'

const useStyles = makeStyles((ui: GeistUIThemes) => ({
  root: {
    minHeight: 'calc(100vh - 135px)',
    width: ui.layout.pageWidthWithMargin,
    maxWidth: '100%',
    padding: `calc(${ui.layout.gap} * 2) ${ui.layout.pageMargin} calc(${ui.layout.gap} * 2)`,
    boxSizing: 'border-box',
    margin: '0 auto'
  }
}))

function TradeFeed(): JSX.Element {
  const classes = useStyles()
  const router = useRouter()
  const [session] = useSession()
  const [, setToast] = useToasts()
  const [isTradeModalOpen, setIsTradeModalOpen] = useState(false)
  const [exchangesAll, setExchangesAll] = useState([])
  const [symbolsAll, setSymbolsAll] = useState([])
  const [exchangesRelated, setExchangesRelated] = useState([])
  const [symbolsRelated, setSymbolsRelated] = useState([])
  const [tradeData, setTradeData] = useState({
    // Trade
    exchange: '',
    symbol: '',
    type: '',
    leverage: null,
    // Inital order
    date: new Date(),
    price: null,
    quantity: null,
    side: ''
  })

  const fetcher = url => axios.get(url).then(res => res.data)
  const { data, error } = useSWR('/api/v1/trade/get-trades-by-user', fetcher)

  if (error) console.log('failed to load') // eslint-disable-line
  if (!data) console.log('loading') // eslint-disable-line

  useEffect(() => {
    handleGetExchanges()
    handleGetSymbols()
  }, [])

  async function handleGetExchanges() {
    const { data: exchanges } = await axios.get('/api/v1/get-exchanges')

    setExchangesAll(
      exchanges.map(exchange => {
        return { label: exchange.name, value: exchange.name }
      })
    )
  }

  async function handleGetSymbols() {
    const { data: symbols } = await axios.get('/api/v1/get-symbols')

    setSymbolsAll(
      symbols.map(symbol => {
        return { label: symbol.symbol, value: symbol.symbol }
      })
    )
  }

  function resetForm() {
    setTradeData({
      // Trade
      exchange: '',
      symbol: '',
      type: '',
      leverage: null,
      // Inital order
      date: new Date(),
      price: null,
      quantity: null,
      side: ''
    })
  }

  async function handleCreateTrade() {
    try {
      const data = {
        ...tradeData,
        user: session.user._id,
        quantityTotal: tradeData.quantity,
        quantityOpen: tradeData.quantity,
        cost: tradeData.quantity * tradeData.price,
        avgEntry: tradeData.price,
        avgExit: 0,
        returnTotal: 0,
        returnPercent: 0
      }

      const { data: createdTrade } = await axios.post('/api/v1/trade/create-trade', data)
      setIsTradeModalOpen(false)
      resetForm()
      router.push(`/trades/${createdTrade._id}`)
      setToast({ text: 'You have successfully added a trade!', type: 'success', delay: 5000 })
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
    <div className={classes.root}>
      <Grid.Container justify="flex-end">
        <Button onClick={() => setIsTradeModalOpen(true)} type="secondary" auto>
          Add Trade
        </Button>
      </Grid.Container>
      <Spacer />
      <div style={{ overflow: 'scroll' }}>
        <Table
          onRow={trade => router.push(`/trades/${trade._id}`)}
          data={data
            .sort((a, b): number => {
              if (new Date(a.dateCreated) < new Date(b.dateCreated)) return -1
              else if (new Date(a.dateCreated) > new Date(b.dateCreated)) return 1
              else return 0
            })
            .map(trade => {
              const {
                _id,
                type,
                leverage,
                exchange,
                symbol,
                status,
                side,
                cost,
                quantityOpen,
                quantityTotal,
                avgEntry,
                avgExit,
                returnPercent,
                returnTotal
              }: {
                _id: string
                type: string
                status: string
                symbol: string
                exchange: string
                side: string
                leverage: number
                cost: number
                quantityOpen: number
                quantityTotal: number
                avgEntry: number
                avgExit: number
                returnPercent: number
                returnTotal: number
              } = trade

              return {
                _id,
                type:
                  type === 'Leverage' ? (
                    <>
                      {type} ({leverage}x)
                    </>
                  ) : (
                    type
                  ),
                symbol: (
                  <Tag invert type="warning">
                    {symbol.toUpperCase()}
                  </Tag>
                ),
                exchange: nbs(exchange),
                side: <Tag type="warning">{side.toUpperCase()}</Tag>,
                quantityTotal: formatQuantity(quantityTotal),
                quantityOpen: formatQuantity(quantityOpen),
                cost: formatCurrency(cost),
                avgEntryPrice: formatCurrency(avgEntry),
                avgExitPrice: formatCurrency(avgExit),
                returnTotal: (
                  <Text type={status === 'WINNER' || returnTotal >= 0 ? 'warning' : 'error'}>
                    {formatCurrency(returnTotal)}
                  </Text>
                ),
                returnPercent: (
                  <Text type={status === 'WINNER' || returnPercent >= 0 ? 'warning' : 'error'}>
                    {nbs(returnPercent.toFixed(2) + ' %')}
                  </Text>
                ),
                result: (
                  <Tag invert type="warning">
                    {status}
                  </Tag>
                )
              }
            })}
        >
          <Table.Column prop="type" label="Type" />
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
        //
        exchangesAll={exchangesAll}
        exchangesRelated={exchangesRelated}
        setExchangesRelated={setExchangesRelated}
        //
        symbolsAll={symbolsAll}
        symbolsRelated={symbolsRelated}
        setSymbolsRelated={setSymbolsRelated}
        //
        handleCreateTrade={handleCreateTrade}
      />
    </div>
  )
}

export default TradeFeed
