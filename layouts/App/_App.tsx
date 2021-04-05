// Packages
import PropTypes from 'prop-types'

// Local Components
import { Header, Footer } from './components'

type AppProps = {
  children: JSX.Element
  toggleDarkMode: () => void
  themeType: string
}

function App({ children, toggleDarkMode, themeType }: AppProps): JSX.Element {
  return (
    <>
      <Header toggleDarkMode={toggleDarkMode} themeType={themeType} />
      {children}
      <Footer />
    </>
  )
}

App.propTypes = {
  children: PropTypes.node.isRequired
}

export default App
