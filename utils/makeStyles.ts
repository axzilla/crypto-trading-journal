/* eslint-disable @typescript-eslint/no-explicit-any */
import { GeistUIThemes, useTheme } from '@geist-ui/react'
import { createUseStyles } from 'react-jss'

function useStyles(styles: ((ui: GeistUIThemes) => any) | any) {
  const theme: GeistUIThemes = useTheme()

  if (typeof styles === 'function') {
    styles = styles(theme)
  }

  return createUseStyles(styles)()
}

function makeStyles(styles: ((ui: GeistUIThemes) => any) | any) {
  return (): any => useStyles(styles)
}

export default makeStyles
