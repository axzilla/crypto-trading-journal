// Packages
import React from 'react'
import PropTypes from 'prop-types'
import { GeistUIThemes, Input as GeistInput, Text } from '@geist-ui/react'

// Utils
import makeStyles from 'utils/makeStyles'

const useStyles = makeStyles((ui: GeistUIThemes) => ({
  label: { marginBottom: ui.layout.gapHalf }
}))

export default function Input({
  onChange,
  onKeyDown,
  value,
  placeholder,
  label,
  fullWidth,
  ...rest
}: Props): JSX.Element {
  const classes = useStyles()

  return (
    <div style={{ width: fullWidth && '100%' }}>
      {label && <Text className={classes.label}>{label}</Text>}

      <GeistInput
        onChange={onChange}
        onKeyDown={onKeyDown}
        value={value}
        placeholder={placeholder}
        width={fullWidth && '100%'}
        {...rest}
      />
    </div>
  )
}

type Props = {
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  onKeyDown?: (e: React.KeyboardEvent<unknown>) => void
  value?: string
  type?: string
  placeholder?: string
  label?: string
  fullWidth?: boolean
}

Input.propTypes = {
  onChange: PropTypes.func,
  onKeyDown: PropTypes.func,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  label: PropTypes.string,
  fullWidth: PropTypes.bool
}
