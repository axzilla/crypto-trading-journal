// Packages
import PropTypes from 'prop-types'
import { getSession } from 'next-auth/client'
import { GetServerSideProps } from 'next'

// Layouts
import { App as AppLayout } from 'layouts'

// Views
import { TradeDetails as TradeDetailsView } from 'views'

function Dashboard({ toggleDarkMode, themeType }: Props): JSX.Element {
  return (
    <AppLayout toggleDarkMode={toggleDarkMode} themeType={themeType}>
      <TradeDetailsView />
    </AppLayout>
  )
}

export const getServerSideProps: GetServerSideProps = async ctx => {
  const session = await getSession(ctx)

  if (!session && ctx.res) {
    ctx.res.writeHead(302, { Location: '/' })
    ctx.res.end()
  }

  return { props: { session } }
}

type Props = {
  toggleDarkMode: () => void
  themeType: string
}

Dashboard.propTypes = {
  toggleDarkMode: PropTypes.func.isRequired,
  themeType: PropTypes.string.isRequired
}

export default Dashboard
