import React from 'react'
import moment from 'moment'
import PropTypes from 'prop-types'
import DatePicker from './DatePicker'
import Field from '../Field'
import MonthNav from './MonthNav'
import YearNav from './YearNav'

import './style.css'

class NewDate extends React.Component {
  state = {
    date: this.props.selected || moment(),
  }

  setDate = (value) => {
    let e = { target: { value: value.format('YYYY-MM-DD') } }
    this.setState({ date: value }, () =>
      this.props.change(e)
    )
  }

  render() {
    const { error, minDate, maxDate } = this.props
    const { date } = this.state
    return (
      <div className="NewDate">
        <YearNav
          date={date}
          setDate={this.setDate}
          minDate={minDate}
          maxDate={maxDate}
        />
        <MonthNav
          date={date}
          setDate={this.setDate}
          minDate={minDate}
          maxDate={maxDate}
        />
        <DatePicker
          date={date}
          setDate={this.setDate}
          minDate={minDate}
          maxDate={maxDate}
        />
        {error && <div className="field-error">{error}</div>}
      </div>
    )
  }
}

Date.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  change: PropTypes.func.isRequired,
}

export default Field(NewDate)
