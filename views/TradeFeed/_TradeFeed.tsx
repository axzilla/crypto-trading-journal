// Packages
import { useState, useEffect } from 'react'
import axios from 'axios'
import useSWR from 'swr'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/client'
import moment from 'moment'

// Geist UI
import {
  GeistUIThemes,
  Card,
  Button,
  useToasts,
  Spinner,
  Grid,
  Spacer,
  Dot,
  Description
} from '@geist-ui/react'

// Components Global
import { TradeModal } from 'components'

// Global Utils
import makeStyles from 'utils/makeStyles'
import nbs from 'utils/nbs'
import formatCurrency from '@utils/formatCurrency'

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
    side: '',
    fees: null
  })

  const fetcher = url => axios.get(url).then(res => res.data)
  const { data, error } = useSWR('/api/v1/trade/get-trades-by-user', fetcher)

  if (error) console.log('failed to load') // eslint-disable-line
  if (!data) console.log('loading') // eslint-disable-line

  useEffect(() => {
    handleGetExchanges()
    handleGetSymbols()
  }, [])

  function getStatusColor(trade): Partial<'warning' | 'error'> {
    if (trade.status === 'Winner' || trade.returnPercent >= 0 || trade.status === 'Open')
      return 'warning'
    if (trade.status === 'Loser' || trade.returnPercent < 0) return 'error'
  }

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
      side: '',
      fees: null
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
        returnPercent: 0,
        date: tradeData.date,
        fees: tradeData.fees
      }

      const { data: createdTrade } = await axios.post('/api/v1/trade/create-trade', data)
      setIsTradeModalOpen(false)
      resetForm()
      router.push(`/trades/${createdTrade._id}`)
      setToast({ text: 'Trade added successfully!', type: 'success', delay: 5000 })
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
      <Grid.Container gap={1}>
        {data
          .sort((a, b): number => {
            if (new Date(a.date) < new Date(b.date)) return -1
            else if (new Date(a.date) > new Date(b.date)) return 1
            else return 0
          })
          .map(trade => {
            return (
              <Grid key={trade._id} xs={24}>
                <Card
                  style={{ cursor: 'pointer' }}
                  hoverable
                  onClick={() => router.push(`/trades/${trade._id}`)}
                >
                  <Grid.Container gap={2}>
                    <Grid xs>
                      <Description
                        title={trade.exchange}
                        content={
                          <>
                            {trade.symbol}
                            <br />({trade.side})
                          </>
                        }
                      />
                    </Grid>
                    <Grid xs>
                      <Description
                        title="Cost"
                        content={
                          <>
                            {formatCurrency(trade.cost)}
                            <br />
                            {trade.type === 'Leverage' && <>({trade.leverage}x)</>}
                          </>
                        }
                      />
                    </Grid>
                    <Grid xs>
                      <Description
                        title="PNL"
                        content={
                          <>
                            {formatCurrency(trade.returnTotal)} ({trade.returnPercent.toFixed(2)}%)
                          </>
                        }
                      />
                    </Grid>
                    <Grid xs>
                      <Description
                        title="Date"
                        content={nbs(moment(trade.date).format('MMMM D, YYYY, h:mm'))}
                      />
                    </Grid>
                    <Grid xs>
                      <Description
                        title="Status"
                        content={<Dot type={getStatusColor(trade)}>{trade.status}</Dot>}
                      />
                    </Grid>
                  </Grid.Container>
                </Card>
              </Grid>
            )
          })}
      </Grid.Container>

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
