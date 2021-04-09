// Packages
import React from 'react'
import PropTypes from 'prop-types'
import { GeistUIThemes, Input as GeistInput, Text } from '@geist-ui/react'
import NumberFormat from 'react-number-format'

// Utils
import makeStyles from 'utils/makeStyles'

const useStyles = makeStyles((ui: GeistUIThemes) => ({
  label: { marginBottom: ui.layout.gapHalf }
}))

export default function Input({
  onChange,
  value,
  type,
  name,
  placeholder,
  label,
  fullWidth,
  ...rest
}: Props): JSX.Element {
  const classes = useStyles()

  return (
    <div style={{ width: fullWidth && '100%' }}>
      {label && <Text className={classes.label}>{label}</Text>}

      {(!type || type === 'text') && (
        <GeistInput
          onChange={onChange}
          value={value}
          type={type || 'text'}
          name={name}
          placeholder={placeholder}
          width={fullWidth && '100%'}
          {...rest}
        />
      )}

      {type === 'number' && (
        <NumberFormat
          customInput={GeistInput}
          color="primary"
          margin="dense"
          variant="outlined"
          onChange={onChange}
          value={value}
          name={name}
          placeholder={placeholder}
          width={fullWidth && '100%'}
          {...rest}
        />
      )}
    </div>
  )
}

type Props = {
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  value?: string
  type?: string
  name?: string
  placeholder?: string
  label?: string
  fullWidth?: boolean
}

Input.propTypes = {
  onChange: PropTypes.func,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  label: PropTypes.string,
  fullWidth: PropTypes.bool
}
