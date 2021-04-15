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

function Number({ onChange, value, placeholder, label, fullWidth, ...rest }: Props): JSX.Element {
  const classes = useStyles()

  return (
    <div style={{ width: fullWidth && '100%' }}>
      {label && <Text className={classes.label}>{label}</Text>}

      <NumberFormat
        customInput={GeistInput}
        color="primary"
        margin="dense"
        variant="outlined"
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
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  value?: number
  placeholder?: string
  label?: string
  fullWidth?: boolean
}

Number.propTypes = {
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  label: PropTypes.string,
  fullWidth: PropTypes.bool
}

export default Number
