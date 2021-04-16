// Packages
import React from 'react'
import PropTypes from 'prop-types'
import { GeistUIThemes, Textarea as GeistTextarea, Text } from '@geist-ui/react'

// Utils
import makeStyles from 'utils/makeStyles'

const useStyles = makeStyles((ui: GeistUIThemes) => ({
  label: { marginBottom: ui.layout.gapHalf }
}))

export default function Textarea({
  onChange,
  value,
  placeholder,
  label,
  fullWidth,
  onBlur,
  ...rest
}: Props): JSX.Element {
  const classes = useStyles()

  return (
    <div style={{ width: fullWidth && '100%' }}>
      {label && <Text className={classes.label}>{label}</Text>}

      <GeistTextarea
        onBlur={onBlur}
        resize="inherit"
        onChange={onChange}
        value={value}
        placeholder={placeholder}
        width={fullWidth && '100%'}
        {...rest}
      />
    </div>
  )
}

type Props = {
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
  onBlur?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
  value?: string
  type?: string
  placeholder?: string
  label?: string
  fullWidth?: boolean
}

Textarea.propTypes = {
  onChange: PropTypes.func,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  label: PropTypes.string,
  fullWidth: PropTypes.bool
}
