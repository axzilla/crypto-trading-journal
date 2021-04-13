// Packages
import React from 'react'
import { signIn } from 'next-auth/client'

// Geist UI
import { Button, GeistUIThemes, Spacer, Grid, Text } from '@geist-ui/react'

// Utils
import makeStyles from 'utils/makeStyles'
import nbs from 'utils/nbs'

const useStyles = makeStyles((ui: GeistUIThemes) => ({
  root: { padding: ui.layout.gap, minHeight: 'calc(100vh - 135px)' },
  title: {
    marginBottom: 0,
    lineHeight: 1,
    fontSize: '8rem',
    fontWeight: 800,
    letterSpacing: '-0.06rem'
  },
  subTitle: {
    fontSize: '1.25rem',
    fontWeight: 400,
    textAlign: 'center'
  },
  [`@media screen and (max-width: 720px)`]: {
    title: { fontSize: '20vw' }
  }
}))

function Home(): JSX.Element {
  const classes = useStyles()
  return (
    <Grid.Container direction="column" alignItems="center" className={classes.root}>
      <Text type="warning" h1 className={classes.title}>
        Trade.
      </Text>
      <Text h1 className={classes.title}>
        Journal.
      </Text>
      <Text type="success" h1 className={classes.title}>
        {nbs('Get Rich.')}
      </Text>
      <Spacer x={5} />

      <Button onClick={() => signIn()} size="large" ghost type="secondary">
        Join now - its free!
      </Button>
      <Spacer x={5} />
      <Text type="secondary" className={classes.subTitle}>
        Trading journal for the crypto space. Track and analyze your trades. The easy way.
      </Text>
    </Grid.Container>
  )
}

export default Home
