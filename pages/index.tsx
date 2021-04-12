// Packages
import React from 'react'
import PropTypes from 'prop-types'
import { getSession } from 'next-auth/client'
import { GetServerSideProps } from 'next'

// Geist UI
import { Button, GeistUIThemes, Spacer, Grid, Text } from '@geist-ui/react'

// Layouts
import { App as AppLayout } from 'layouts'

// Utils
import makeStyles from 'utils/makeStyles'

const useStyles = makeStyles((ui: GeistUIThemes) => ({
  root: { padding: ui.layout.gap },
  title: {
    marginBottom: 0,
    lineHeight: 1,
    fontSize: '8rem',
    fontWeight: 800,
    letterSpacing: '-0.06rem',
    color: 'pink'
  }
}))

function Home({ toggleDarkMode, themeType }: Props): JSX.Element {
  const classes = useStyles()
  return (
    <AppLayout toggleDarkMode={toggleDarkMode} themeType={themeType}>
      <Grid.Container direction="column" alignItems="center" className={classes.root}>
        <Text type="warning" h1 className={classes.title}>
          Trade.
        </Text>
        <Text h1 className={classes.title}>
          Journal.
        </Text>
        <Text type="success" h1 className={classes.title}>
          Get Rich.
        </Text>
        <Spacer x={5} />

        <Button size="large" ghost type="secondary">
          Join now - its free!
        </Button>
        <Spacer x={5} />
        <Text h3 type="secondary">
          Trading journal for the crypto space. Track and analyze your trades. The easy way.
        </Text>
      </Grid.Container>
    </AppLayout>
  )
}

export const getServerSideProps: GetServerSideProps = async ctx => {
  const session = await getSession(ctx)

  if (session && ctx.res) {
    ctx.res.writeHead(302, { Location: '/trades' })
    ctx.res.end()
  }

  return { props: { session } }
}

type Props = {
  toggleDarkMode: () => void
  themeType: string
}

Home.propTypes = {
  toggleDarkMode: PropTypes.func.isRequired,
  themeType: PropTypes.string.isRequired
}

export default Home
