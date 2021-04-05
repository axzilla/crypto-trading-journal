import React from 'react'
import { GeistUIThemes, Text, Grid, Spacer } from '@geist-ui/react'
import { Heart } from '@geist-ui/react-icons'

import makeStyles from '../../../../utils/makeStyles'

const useStyles = makeStyles((ui: GeistUIThemes) => ({
  root: {
    padding: '8px 42px',
    display: 'flex',
    flexdirection: 'row',
    alignItems: 'center'
  },
  logo: {
    borderRadius: '50% !important',
    margin: '0 6px 0 0 !important'
  },
  [`@media screen and (min-width: ${ui.layout.pageWidthWithMargin})`]: {
    root: {
      textAlign: 'start !important'
    }
  }
}))

function Footer(): JSX.Element {
  const classes = useStyles()
  return (
    <Grid.Container justify="center">
      <div className={classes.root}>
        <Text>Made with</Text>
        <Spacer inline x={0.35} />
        <Heart color="red" />
      </div>
    </Grid.Container>
  )
}

export default Footer
