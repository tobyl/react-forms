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
    displayDate: this.props.displayDate || moment(),
    selectedDate: moment(),
  }

  componentDidUpdate() {
    if (this.props.value) {
      const selected = this.state.selectedDate.format('YYYY-MM-DD')
      const nextValue = moment(this.props.value).format('YYYY-MM-DD')
      if (selected !== nextValue) {
        this.setState({ selectedDate: moment(this.props.value) })
      }
    }
  }

  setDisplayDate = (value) => {
    this.setState({ selectedDate: value })
  }

  setDate = (value) => {
    let e = {
      target: {
        value: value.format('YYYY-MM-DD')
      }
    }
    this.setState({ date: value }, () =>
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
            date={displayDate}
            setDate={this.setDisplayDate}
            minDate={minDate}
            maxDate={maxDate}
          />}
        <MonthNav
          date={displayDate}
          setDate={this.setDisplayDate}
          minDate={minDate}
          maxDate={maxDate}
        />
        <DatePicker
          date={displayDate}
          selectedDate={selectedDate}
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
