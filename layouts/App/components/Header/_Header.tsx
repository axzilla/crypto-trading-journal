// Packages
import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { signOut, useSession } from 'next-auth/client'
import axios from 'axios'

// Utils
import makeStyles from 'utils/makeStyles'

// Geist UI
import {
  Button,
  GeistUIThemes,
  Link,
  Popover,
  Avatar,
  Spacer,
  Grid,
  Modal,
  Textarea,
  useToasts
} from '@geist-ui/react'
import {
  Sun as SunIcon,
  Moon as MoonIcon,
  TrendingUp as TrendingUpIcon,
  Github as GithubIcon,
  Mail as MailIcon
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
  const [session] = useSession()
  const [, setToast] = useToasts()
  const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false)
  const [feedback, setFeedback] = useState('')

  async function handleSendFeedback() {
    try {
      await axios.post('/api/feedback', { feedback })
      setIsFeedbackModalOpen(false)
      setFeedback('')
      setToast({ text: 'Thanks for your feedback!', type: 'success', delay: 5000 })
    } catch (error) {
      setToast({ text: 'Error, please try it again!', type: 'error', delay: 5000 })
    }
  }

  return (
    <>
      <Grid className={classes.root}>
        <Grid.Container className={classes.header}>
          <Grid className={classes.headerContent} justify="space-between">
            <Grid.Container alignItems="center">
              <TrendingUpIcon />
            </Grid.Container>

            {session && (
              <>
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
                  iconRight={<MailIcon />}
                  onClick={() => setIsFeedbackModalOpen(true)}
                  auto
                  size="small"
                />
                <Spacer />
              </>
            )}
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

      <Modal open={isFeedbackModalOpen} onClose={() => setIsFeedbackModalOpen(false)}>
        <Modal.Subtitle>Feedback</Modal.Subtitle>
        <Modal.Content>
          <Textarea
            width="100%"
            placeholder="Your feedback..."
            value={feedback}
            onChange={e => setFeedback(e.target.value)}
          />
        </Modal.Content>
        <Modal.Action passive onClick={() => setIsFeedbackModalOpen(false)}>
          Cancel
        </Modal.Action>
        <Modal.Action disabled={!feedback} onClick={handleSendFeedback}>
          Send
        </Modal.Action>
      </Modal>
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
