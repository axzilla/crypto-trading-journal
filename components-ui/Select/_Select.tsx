// Packages
import React from 'react'
import PropTypes from 'prop-types'
import { GeistUIThemes, Select, Text } from '@geist-ui/react'

// Utils
import makeStyles from '../../utils/makeStyles'

const useStyles = makeStyles((ui: GeistUIThemes) => ({
  label: { marginBottom: ui.layout.gapHalf }
}))

type SelectProps = {
  onChange?: (value: string) => void
  options: { label: string; value: string }[]
  placeholder?: string
  label?: string
  value?: string | string[]
  fullWidth?: boolean
}

export default function SelectField({
  onChange,
  options,
  placeholder,
  label,
  value,
  fullWidth,
  ...rest
}: SelectProps): JSX.Element {
  const classes = useStyles()

  return (
    <div style={{ width: '100%' }}>
      {label && <Text className={classes.label}>{label}</Text>}
      <Select
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        width={fullWidth && '100%'}
        {...rest}
        style={{ maxWidth: '100vw' }}
      >
        {options.map(option => {
          return (
            <Select.Option key={option.label} value={option.value}>
              {option.label}
            </Select.Option>
          )
        })}
      </Select>
    </div>
  )
}

SelectField.propTypes = {
  onChange: PropTypes.func.isRequired,
  options: PropTypes.array.isRequired,
  placeholder: PropTypes.string,
  label: PropTypes.string,
  fullWidth: PropTypes.bool
}
