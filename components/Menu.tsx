// Packages
import React, { useEffect, useState } from 'react'
import { Avatar, GeistUIThemes, Link, Popover, Tabs } from '@geist-ui/react'
import { signOut, useSession } from 'next-auth/client'

// Utils
import makeStyles from '../utils/makeStyles'

const useStyles = makeStyles((ui: GeistUIThemes) => ({
  header: {
    width: ui.layout.pageWidthWithMargin,
    maxWidth: '100%',
    margin: '0 auto',
    backgroundColor: ui.palette.background,
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
    backgroundColor: ui.palette.background,
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
      padding: '12px !important',
      margin: '0 !important',
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

const popoverContent = () => {
  const [session] = useSession()

  return (
    <>
      <Popover.Item title>
        <span>{session.user.email}</span>
      </Popover.Item>
      <Popover.Item onClick={signOut}>
        <Link>Logout</Link>
      </Popover.Item>
    </>
  )
}

// eslint-disable-next-line
function Menu(): JSX.Element {
  const classes = useStyles()
  const [fixed, setFixed] = useState(false)

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
            <div className={classes.headerTitle}>Crypto Trading Tools</div>
          </div>
          <div className={classes.sidebar}>
            <Popover
              content={popoverContent}
              placement="bottomEnd"
              portalClassName={classes.popover}
            >
              <Avatar text="OA" />
            </Popover>
          </div>
        </div>
      </div>
      <nav className={classes.nav + ' ' + (fixed ? classes.navFixed : '')}>
        <div className={classes.navContent}>
          <Tabs initialValue="1">
            <Tabs.Item label="Overview" value="1" />
            <Tabs.Item label="Projects" value="2" />
            <Tabs.Item label="Integrations" value="3" />
            <Tabs.Item label="Activity" value="4" />
            <Tabs.Item label="Domains" value="5" />
            <Tabs.Item label="Usage" value="6" />
            <Tabs.Item label="Settings" value="7" />
          </Tabs>
        </div>
      </nav>
    </>
  )
}

export default Menu
