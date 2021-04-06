// Packages
import React from 'react'
import PropTypes from 'prop-types'
import { GeistUIThemes, AutoComplete, Text } from '@geist-ui/react'

// Utils
import makeStyles from '../../utils/makeStyles'

const useStyles = makeStyles((ui: GeistUIThemes) => ({
  label: { marginBottom: ui.layout.gapHalf },
  autocomplete: { maxWidth: '100vw' }
}))

export default function Autocomplete({
  onSearch,
  value,
  options,
  placeholder,
  label,
  fullWidth,
  ...rest
}: Props): JSX.Element {
  const classes = useStyles()

  return (
    <div style={{ width: '100%' }}>
      {label && <Text className={classes.label}>{label}</Text>}
      <AutoComplete
        clearable
        className={classes.autocomplete}
        onSearch={onSearch}
        value={value}
        options={options}
        placeholder={placeholder}
        width={fullWidth && '100%'}
        {...rest}
      />
    </div>
  )
}

type Props = {
  onSearch: (value: string) => void
  value: string
  options: { label: string; value: string }[]
  placeholder?: string
  label?: string
  fullWidth?: boolean
}

Autocomplete.propTypes = {
  onSearch: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
  placeholder: PropTypes.string,
  label: PropTypes.string,
  fullWidth: PropTypes.bool
}
