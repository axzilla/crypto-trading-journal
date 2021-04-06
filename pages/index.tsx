import { GetServerSideProps } from 'next'

function Home(): JSX.Element {
  return null
}

export const getServerSideProps: GetServerSideProps = async ctx => {
  if (ctx.res) {
    ctx.res.writeHead(302, { Location: '/trades' })
    ctx.res.end()
  }

  return { props: { undefined } }
}

export default Home
