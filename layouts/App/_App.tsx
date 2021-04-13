// Packages
import PropTypes from 'prop-types'

// Local Components
import { Header, Footer } from './components'

function App({ children, toggleDarkMode, themeType }: Props): JSX.Element {
  return (
    <div style={{ minHeight: '100vh' }}>
      <Header toggleDarkMode={toggleDarkMode} themeType={themeType} />
      {children}
      <Footer />
    </div>
  )
}

type Props = {
  children: JSX.Element
  toggleDarkMode: () => void
  themeType: string
}

App.propTypes = {
  children: PropTypes.node.isRequired,
  toggleDarkMode: PropTypes.func.isRequired,
  themeType: PropTypes.string.isRequired
}

export default App
