// Packages
import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { signOut, useSession } from 'next-auth/client'
import axios from 'axios'

// Utils
import makeStyles from 'utils/makeStyles'

// Geist UI
import {
  Snippet,
  Description,
  Text,
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
  Mail as MailIcon,
  DollarSign as DollarSignIcon
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
  const [isLoading, setIsLoading] = useState(false)
  const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false)
  const [isDonateModalOpen, setIsDonateModalOpen] = useState(false)
  const [feedback, setFeedback] = useState('')

  async function handleSendFeedback() {
    try {
      setIsLoading(true)
      await axios.post('/api/v1/feedback', { feedback })
      setIsFeedbackModalOpen(false)
      setFeedback('')
      setToast({ text: 'Thanks for your feedback!', type: 'success', delay: 5000 })
      setIsLoading(false)
    } catch (error) {
      setIsLoading(false)
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
                <Spacer x={0.5} />
                <Button
                  iconRight={<MailIcon />}
                  onClick={() => setIsFeedbackModalOpen(true)}
                  auto
                  size="small"
                />
                <Spacer x={0.5} />
                <Button
                  iconRight={<DollarSignIcon />}
                  onClick={() => setIsDonateModalOpen(true)}
                  auto
                  size="small"
                />
                <Spacer x={0.5} />
              </>
            )}
            <Button
              onClick={toggleDarkMode}
              iconRight={themeType === 'dark' ? <MoonIcon /> : <SunIcon />}
              auto
              size="small"
            />
            <Spacer x={0.5} />
            <Link href="https://github.com/badazzdev/crypto-trading-journal" target="_blank">
              <GithubIcon size={20} />
            </Link>
          </Grid>
        </Grid.Container>
      </Grid>

      {/* Feedback Modal */}
      <Modal
        disableBackdropClick={isLoading}
        open={isFeedbackModalOpen}
        onClose={() => {
          setIsFeedbackModalOpen(false)
          setFeedback('')
        }}
      >
        <Modal.Title>Feedback</Modal.Title>
        <Modal.Content>
          <Text type="secondary" style={{ textAlign: 'center' }}>
            Did you find a bug or do you have suggestions for improvement or ideas for new features?
            Then I am very happy about your feedback!
          </Text>
        </Modal.Content>
        <Modal.Content>
          <Textarea
            width="100%"
            placeholder="Your feedback..."
            value={feedback}
            onChange={e => setFeedback(e.target.value)}
          />
        </Modal.Content>
        <Modal.Action
          passive
          loading={isLoading}
          onClick={() => {
            setIsFeedbackModalOpen(false)
            setFeedback('')
          }}
        >
          Cancel
        </Modal.Action>
        <Modal.Action loading={isLoading} disabled={!feedback} onClick={handleSendFeedback}>
          Send
        </Modal.Action>
      </Modal>

      {/* Donate Modal */}
      <Modal open={isDonateModalOpen} onClose={() => setIsDonateModalOpen(false)}>
        <Modal.Title>Donate</Modal.Title>
        <Modal.Content>
          <Text type="secondary" style={{ textAlign: 'center' }}>
            If you would like to support this project and the further development and functions such
            as free trade signals, bots and so on, I am very happy about a donation!
          </Text>
        </Modal.Content>
        <Modal.Content>
          <Description
            title="BTC Wallet Address"
            content={<Snippet symbol="" text="19JrHnYW7auqtDYY9beo9orgvtxCbrPHnu" type="warning" />}
          />
          <Spacer />
          <Description
            title="ETH Wallet Address"
            content={
              <Snippet symbol="" text="0x0637305c06b0aae04ce7ac2322cd8771b5470d9a" type="warning" />
            }
          />
          <Spacer />
          <Description
            title="USDT Wallet Address"
            content={
              <Snippet symbol="" text="0x0637305c06b0aae04ce7ac2322cd8771b5470d9a" type="warning" />
            }
          />
        </Modal.Content>
        <Modal.Action passive loading={isLoading} onClick={() => setIsDonateModalOpen(false)}>
          Okay
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
