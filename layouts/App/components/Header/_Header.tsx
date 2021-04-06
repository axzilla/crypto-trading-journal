// Packages
import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { signOut, useSession } from 'next-auth/client'

// Utils
import makeStyles from '../../../../utils/makeStyles'

// Geist UI
import { Button, GeistUIThemes, Link, Popover, Tabs, Avatar, Spacer } from '@geist-ui/react'
import {
  Sun as SunIcon,
  Moon as MoonIcon,
  TrendingUp as TrendingUpIcon
} from '@geist-ui/react-icons'

const useStyles = makeStyles((ui: GeistUIThemes) => ({
  header: {
    width: ui.layout.pageWidthWithMargin,
    maxWidth: '100%',
    margin: '0 auto',
    fontSize: 16,
    height: 60,
    zIndex: 15
  },
  headerContent: {
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: `0 ${ui.layout.pageMargin}`
  },
  headerTitle: {
    fontWeight: 500,
    display: 'flex',
    alignItems: 'center',
    paddingLeft: 10
  },
  nav: {
    position: 'sticky',
    top: 0,
    borderBottom: `solid 1px ${ui.palette.accents_2}`,
    zIndex: 15
  },
  navFixed: {
    borderBottom: ui.type === 'light' && 'none',
    boxShadow: ui.type === 'light' && 'rgba(0, 0, 0, 0.1) 0 0 15px 0'
  },
  navContent: {
    width: ui.layout.pageWidthWithMargin,
    maxWidth: '100%',
    height: '100%',
    margin: '0 auto',
    '& .tabs header': {
      padding: `0 ${ui.layout.pageMargin}`,
      borderBottom: 'none !important',
      flexWrap: 'nowrap !important',
      overflowY: 'hidden',
      overflowX: 'auto',
      overflow: '-moz-scrollbars-none',
      '-ms-overflow-style': 'none',
      '&::-webkit-scrollbar': {
        display: 'none'
      }
    },
    '& .content': {
      display: 'none !important'
    },
    '& .tab': {
      padding: '12px 0 !important',
      // margin: '0 !important',
      fontSize: '14px !important'
    }
  },
  sidebar: {
    display: 'flex',
    alignItems: 'center !important'
  },
  themeIcon: {
    width: '40px !important',
    height: '40px !important',
    display: 'flex !important',
    justifyContent: 'center !important',
    alignItems: 'center !important',
    marginRight: 5,
    padding: '0 !important'
  },
  popover: {
    width: '180px !important'
  }
}))

function Menu({ toggleDarkMode, themeType }: Props): JSX.Element {
  const classes = useStyles()
  const [fixed, setFixed] = useState(false)
  const [session] = useSession()

  useEffect(() => {
    const scrollHandler = () => {
      const shouldFixed = document.documentElement.scrollTop > 60
      if (fixed !== shouldFixed) setFixed(shouldFixed)
    }

    document.addEventListener('scroll', scrollHandler)
    return () => document.removeEventListener('scroll', scrollHandler)
  }, [fixed])

  return (
    <>
      <div className={classes.header}>
        <div className={classes.headerContent}>
          <div style={{ display: 'flex' }}>
            <TrendingUpIcon />
            <div className={classes.headerTitle}>Crypto Trading Tools</div>
          </div>
          <div className={classes.sidebar}>
            <Popover
              content={
                <>
                  <Popover.Item title>
                    <span>{session.user.email}</span>
                  </Popover.Item>
                  <Popover.Item onClick={signOut}>
                    <Link>Logout</Link>
                  </Popover.Item>
                </>
              }
              placement="bottomEnd"
              portalClassName={classes.popover}
            >
              <Avatar text={session.user.email.slice(0, 1).toUpperCase()} />
            </Popover>
            <Spacer />
            <Button
              onClick={toggleDarkMode}
              iconRight={themeType === 'dark' ? <MoonIcon /> : <SunIcon />}
              auto
              size="small"
            />
          </div>
        </div>
      </div>
      <nav className={classes.nav + ' ' + (fixed ? classes.navFixed : '')}>
        <div className={classes.navContent}>
          <Tabs initialValue="1">
            <Tabs.Item label="Trading Journal" value="1" />
          </Tabs>
        </div>
      </nav>
    </>
  )
}

type Props = {
  toggleDarkMode: () => void
  themeType: string
}

Menu.propTypes = {
  toggleDarkMode: PropTypes.func.isRequired,
  themeType: PropTypes.string.isRequired
}

export default Menu
