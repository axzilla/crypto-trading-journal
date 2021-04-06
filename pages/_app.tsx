// Packages
import { useState, useEffect } from 'react'
import { CssBaseline, GeistProvider } from '@geist-ui/react'
import { AppProps } from 'next/app'
import Head from 'next/head'
import { Provider as NextAuthProvider } from 'next-auth/client'
import PropTypes from 'prop-types'
import Cookies from 'universal-cookie'

const cookies = new Cookies()

// Use the <Provider> to improve performance and allow components that call
// `useSession()` anywhere in your application to access the `session` object.
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
        <title>Crypto Trading Tools</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
      </Head>

      <NextAuthProvider
        // Provider options are not required but can be useful in situations where
        // you have a short session maxAge time. Shown here with default values.
        options={{
          // Client Max Age controls how often the useSession in the client should
          // contact the server to sync the session state. Value in seconds.
          // e.g.
          // * 0  - Disabled (always use cache value)
          // * 60 - Sync session state with server if it's older than 60 seconds
          clientMaxAge: 0,
          // Keep Alive tells windows / tabs that are signed in to keep sending
          // a keep alive request (which extends the current session expiry) to
          // prevent sessions in open windows from expiring. Value in seconds.
          //
          // Note: If a session has expired when keep alive is triggered, all open
          // windows / tabs will be updated to reflect the user is signed out.
          keepAlive: 0
        }}
        session={pageProps.session}
      >
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
