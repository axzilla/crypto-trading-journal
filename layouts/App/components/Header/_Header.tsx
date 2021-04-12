// Packages
import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { signOut, useSession } from 'next-auth/client'
import NextLink from 'next/Link'

// Utils
import makeStyles from 'utils/makeStyles'

// Geist UI
import { Button, GeistUIThemes, Link, Popover, Avatar, Spacer, Grid, Text } from '@geist-ui/react'
import {
  Sun as SunIcon,
  Moon as MoonIcon,
  TrendingUp as TrendingUpIcon,
  Github as GithubIcon
} from '@geist-ui/react-icons'

const useStyles = makeStyles((ui: GeistUIThemes) => ({
  root: { borderBottom: `solid 1px ${ui.palette.accents_2}` },
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
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: `0 ${ui.layout.pageMargin}`
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
    <Grid className={classes.root}>
      <Grid.Container className={classes.header}>
        <Grid className={classes.headerContent} justify="space-between">
          <Grid.Container alignItems="center">
            <TrendingUpIcon />
            <Spacer x={0.5} />
            <Text className={classes.headerTitle}>Crypto Trading Journal</Text>
          </Grid.Container>

          <Popover
            content={
              <>
                <Popover.Item title>{session.user.email}</Popover.Item>
                <Popover.Item onClick={signOut}>
                  <Link>Logout</Link>
                </Popover.Item>
              </>
            }
            placement="bottomEnd"
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
          <Spacer />
          <Link href="https://github.com/badazzdev/crypto-trading-journal" target="_blank">
            <GithubIcon size={20} />
          </Link>
        </Grid>
      </Grid.Container>
    </Grid>
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
