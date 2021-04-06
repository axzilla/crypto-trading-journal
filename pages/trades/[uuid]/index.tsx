import React from 'react'
import PropTypes from 'prop-types'
import { getSession } from 'next-auth/client'
import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import useSWR from 'swr'
import { request } from 'graphql-request'

import { App as AppLayout } from './../../../layouts'

type DashboardProps = {
  toggleDarkMode: () => void
  themeType: string
}

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

function Dashboard({ toggleDarkMode, themeType }: DashboardProps): JSX.Element {
  const router = useRouter()
  const { uuid } = router.query

  const { data, error } = useSWR([TRADE_BY_UUID_QUERY, uuid], (query, uuid) =>
    request('/api/graphql', query, { uuid })
  )

if (error) console.log('failed to load') // eslint-disable-line
if (!data) console.log('loading') // eslint-disable-line

  return (
    <AppLayout toggleDarkMode={toggleDarkMode} themeType={themeType}>
      <p>{uuid}</p>
    </AppLayout>
  )
}

export const getServerSideProps: GetServerSideProps = async ctx => {
  const session = await getSession(ctx)

  if (!session && ctx.res) {
    ctx.res.writeHead(302, { Location: '/api/auth/signin' })
    ctx.res.end()
  }

  return { props: { session } }
}

Dashboard.propTypes = {
  toggleDarkMode: PropTypes.func.isRequired,
  themeType: PropTypes.string.isRequired
}

export default Dashboard
