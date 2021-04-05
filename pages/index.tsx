import React from 'react'
import PropTypes from 'prop-types'
import { getSession } from 'next-auth/client'
import { GetServerSideProps } from 'next'

import { App as AppLayout } from './../layouts'
import { Home as HomeView } from './../views'

type DashboardProps = {
  toggleDarkMode: () => void
  themeType: string
}

function Dashboard({ toggleDarkMode, themeType }: DashboardProps): JSX.Element {
  return (
    <AppLayout toggleDarkMode={toggleDarkMode} themeType={themeType}>
      <HomeView />
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
