import React from 'react'

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

export default Dashboard
