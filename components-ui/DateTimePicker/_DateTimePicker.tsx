// Packages
import React from 'react'
import PropTypes from 'prop-types'
import { GeistUIThemes, Input as GeistInput, Text } from '@geist-ui/react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

// Utils
import makeStyles from 'utils/makeStyles'

const useStyles = makeStyles((ui: GeistUIThemes) => ({
  label: { marginBottom: ui.layout.gapHalf },
  datePickerWrapper: {
    '& .react-datepicker-popper': { zIndex: 999 },
    '& .react-datepicker__month-container': {
      background: ui.palette.background
    },
    '& .react-datepicker__day': {
      color: ui.palette.accents_8,
      '&:hover': {
        borderRadius: '0.3rem',
        backgroundColor: ui.palette.warning
      }
    },
    '& .react-datepicker__day--selected': {
      backgroundColor: ui.palette.warning
    },
    '& .react-datepicker-wrapper': { width: '100%' },
    '& .react-datepicker__time-container': { overflow: 'hidden' },
    '& .react-datepicker__time-list': { background: ui.palette.background },
    '& .react-datepicker__time-list-item': {
      padding: 2,
      color: ui.palette.accents_8,
      '&:hover': { backgroundColor: `${ui.palette.warning} !Important` },
      '&::before': { display: 'none' }
    },
    '& .react-datepicker__time-container .react-datepicker__time .react-datepicker__time-box ul.react-datepicker__time-list li.react-datepicker__time-list-item': {
      margin: 8,
      height: 'auto',
      borderRadius: '0.3rem'
    },
    '& .react-datepicker__time-list-item--selected': {
      background: `${ui.palette.warning} !Important`
    },
    '& .react-datepicker__header': {
      backgroundColor: `${ui.palette.background} !Important`,
      color: `${ui.palette.accents_8} !Important`
    },
    '& .react-datepicker__current-month': {
      color: `${ui.palette.accents_8} !Important`
    },
    '& .react-datepicker__day-name': {
      color: `${ui.palette.accents_8} !Important`
    },
    '& .react-datepicker-time__header': {
      color: `${ui.palette.accents_8} !Important`
    }
  }
}))

export default function DateTimePicker({
  onChange,
  value,
  label,
  fullWidth,
  ...rest
}: Props): JSX.Element {
  const classes = useStyles()

  return (
    <div style={{ width: '100%' }}>
      {label && <Text className={classes.label}>{label}</Text>}
      <div className={fullWidth && classes.datePickerWrapper}>
        <DatePicker
          dateFormat="MMMM d, yyyy, h:mm aa"
          showTimeSelect
          timeIntervals={1}
          onChange={onChange}
          selected={value}
          customInput={<GeistInput width={fullWidth && '100%'} {...rest} />}
        />
      </div>
    </div>
  )
}

type Props = {
  onChange: (e: string) => void
  value: Date
  label?: string
  fullWidth?: boolean
}

DateTimePicker.propTypes = {
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  label: PropTypes.string,
  fullWidth: PropTypes.bool
}
