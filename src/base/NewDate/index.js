import React from 'react'
import { format, isSameDay } from 'date-fns'
import PropTypes from 'prop-types'
import DatePicker from './DatePicker'
import Field from '../Field'
import MonthNav from './MonthNav'
import YearNav from './YearNav'

import './style.css'

class NewDate extends React.Component {
  state = {
    displayDate: this.props.displayDate || new Date(),
    selectedDate: this.props.selectedDate || new Date(),
  }

  componentDidUpdate() {
    if (this.props.value) {
      let nextDate = new Date(this.props.value)
      if (!isSameDay(this.state.selectedDate, nextDate)) {
        this.setState({ selectedDate: nextDate })
      }
    }
  }

  setDisplayDate = (value) => {
    this.setState({ displayDate: value })
  }

  setSelectedDate = (value) => {
    let e = {
      target: { value: format(value, 'YYYY-MM-DD') }
    }
    this.setState({ selectedDate: value }, () =>
      this.props.change(e)
    )
  }

  render() {
    const { error, minDate, maxDate, showYear } = this.props
    const { displayDate, selectedDate } = this.state
    return (
      <div className="NewDate">
        {showYear &&
          <YearNav
            displayDate={displayDate}
            setDisplayDate={this.setDisplayDate}
            minDate={minDate}
            maxDate={maxDate}
          />}
        <MonthNav
          displayDate={displayDate}
          setDisplayDate={this.setDisplayDate}
          minDate={minDate}
          maxDate={maxDate}
        />
        <DatePicker
          displayDate={displayDate}
          selectedDate={selectedDate}
          setSelectedDate={this.setSelectedDate}
          minDate={minDate}
          maxDate={maxDate}
        />
        {error && <div className="field-error">{error}</div>}
      </div>
    )
  }
}

NewDate.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  change: PropTypes.func.isRequired,
}

NewDate.displayName = 'NewDate'
export default Field(NewDate, 'NewDate')
