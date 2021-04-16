// Packages
import { useState } from 'react'
import { useRouter } from 'next/router'
import NextLink from 'next/link'
import useSWR from 'swr'
import axios from 'axios'

// Geist UI
import { GeistUIThemes, Spacer, Grid, Link, useToasts, Spinner } from '@geist-ui/react'
import { ArrowLeft as ArrowLeftIcon } from '@geist-ui/react-icons'

// Global Utils
import makeStyles from 'utils/makeStyles'

// Global Components
import { DeleteTradeModal } from 'components'

// Local Components
import { OrderTable, TradeTable, Notes, Tags, Images } from './components'

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
  const [isDeleteTradeModalOpen, setIsDeleteTradeModalOpen] = useState<string | boolean>(false)

  const fetcher = url => axios.get(url).then(res => res.data)
  const { data, error, mutate } = useSWR(`/api/v1/trade/get-trade-by-id/${tradeId}`, fetcher)

  if (error) console.log('failed to load') // eslint-disable-line
  if (!data) console.log('loading') // eslint-disable-line

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
      <TradeTable trade={data} setIsDeleteTradeModalOpen={setIsDeleteTradeModalOpen} />
      <Spacer y={1} />
      <OrderTable trade={data} mutate={mutate} />
      <DeleteTradeModal
        isDeleteTradeModalOpen={isDeleteTradeModalOpen}
        setIsDeleteTradeModalOpen={setIsDeleteTradeModalOpen}
        handleDeleteTrade={handleDeleteTrade}
      />
      <Spacer y={1} />
      <Grid.Container gap={2}>
        <Grid xs={24} md={12}>
          <Tags type="setup" trade={data} mutate={mutate} />
        </Grid>
        <Grid xs={24} md={12}>
          <Tags type="mistake" trade={data} mutate={mutate} />
        </Grid>
      </Grid.Container>
      <Spacer y={1} />
      <Images trade={data} mutate={mutate} />
      <Spacer y={1} />
      <Notes trade={data} />
    </div>
  )
}

export default TradeDetails
