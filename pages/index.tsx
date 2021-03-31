import React from 'react'
import { getSession } from 'next-auth/client'
import { GetServerSideProps } from 'next'

import Content from '../components/Content'
import Footer from '../components/Footer'
import Heading from '../components/Heading'
import Menu from '../components/Menu'

function Dashboard(): JSX.Element {
  return (
    <>
      <Menu />
      <Heading />
      <Content />
      <Footer />
    </>
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

export default Dashboard
