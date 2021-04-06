// Packages
import { useRouter } from 'next/router'
import useSWR from 'swr'
import { request } from 'graphql-request'
import moment from 'moment'

// Geist UI
import { GeistUIThemes, Table, Tag, Text, Card } from '@geist-ui/react'

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
  }
}))

const TRADE_BY_UUID_QUERY = /* GraphQL */ `
  query tradeByUuid($uuid: String!) {
    tradeByUuid(uuid: $uuid) {
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

function TradeDetails(): JSX.Element {
  const classes = useStyles()
  const router = useRouter()
  const { uuid } = router.query

  const { data, error } = useSWR([TRADE_BY_UUID_QUERY, uuid], (query, uuid) =>
    request('/api/graphql', query, { uuid })
  )

  if (error) console.log('failed to load') // eslint-disable-line
  if (!data) console.log('loading') // eslint-disable-line
  if (data) console.log(data.tradeByUuid) // eslint-disable-line

  return !data ? (
    <p>Loading</p>
  ) : (
    <div className={classes.content}>
      <Card>
        <Text h4>
          {data.tradeByUuid[0].symbol}:{data.tradeByUuid[0].exchange}
        </Text>
        <div style={{ overflow: 'scroll' }}>
          <Table
            data={
              data &&
              data.tradeByUuid
                .sort((a, b) => b.date_created - a.date_created)
                .map(trade => {
                  const { action, price, quantity, fee, date, status } = trade

                  return {
                    action: <Tag type="warning">{action.toUpperCase()}</Tag>,
                    price,
                    quantity,
                    fee,
                    date: (
                      <div style={{ display: 'flex', whiteSpace: 'nowrap' }}>
                        {moment
                          .unix(date / 1000)
                          .utc()
                          .format('MMMM D, YYYY, h:mm')}
                      </div>
                    ),
                    status: (
                      <Tag invert type="warning">
                        {status.toUpperCase()}
                      </Tag>
                    )
                  }
                })
            }
          >
            <Table.Column prop="action" label="action" />
            <Table.Column prop="price" label="price" />
            <Table.Column prop="quantity" label="quantity" />
            <Table.Column prop="fee" label="fee" />
            <Table.Column prop="date" label="date" />
            <Table.Column prop="status" label="status" />
          </Table>
        </div>
      </Card>
    </div>
  )
}

TradeDetails.propTypes = {}

export default TradeDetails
