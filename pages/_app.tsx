// Packages
import { useState, useEffect } from 'react'
import { CssBaseline, GeistProvider } from '@geist-ui/react'
import { AppProps } from 'next/app'
import Head from 'next/head'
import { Provider as NextAuthProvider } from 'next-auth/client'
import PropTypes from 'prop-types'
import Cookies from 'universal-cookie'

const cookies = new Cookies()

export default function App({ Component, pageProps }: AppProps): JSX.Element {
  const [themeType, setThemeType] = useState('')

  useEffect(() => {
    const themeType = cookies.get('themeType')

    if (!themeType) {
      !themeType && cookies.set('themeType', 'dark', { path: '/' })
      setThemeType(cookies.get('themeType') || 'dark')
    } else {
      !themeType && cookies.set('themeType', themeType, { path: '/' })
      setThemeType(themeType)
    }
  }, [])

  function toggleDarkMode(): void {
    cookies.set('themeType', cookies.get('themeType') === 'dark' ? 'light' : 'dark', { path: '/' })
    setThemeType(themeType === 'dark' ? 'light' : 'dark')
  }

  const modifiedPageProps = { ...pageProps, toggleDarkMode, themeType }

  return (
    <>
      <Head>
        <title>Crypto Trading Journal</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
      </Head>
      <NextAuthProvider options={{ clientMaxAge: 0, keepAlive: 0 }} session={pageProps.session}>
        <GeistProvider themeType={themeType}>
          <CssBaseline />
          <Component {...modifiedPageProps} />
        </GeistProvider>
      </NextAuthProvider>
    </>
  )
}

App.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired
}
