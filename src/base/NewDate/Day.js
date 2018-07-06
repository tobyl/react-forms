import React from 'react'
import { format, isWeekend, isToday, isBefore, isAfter } from 'date-fns'
import classNames from 'classnames'

class Day extends React.Component {
  handleDayClick = (date) => {
    if (!this.beforeMin() && !this.afterMax()) {
      this.setState({ selected: true }, () =>
        this.props.setDate(date)
      )
    }
  }

  beforeMin = () => {
    if (this.props.minDate) {
      if (isBefore(this.props.date, this.props.minDate)) {
        return true
      }
    }
    return false
  }

  afterMax = () => {
    if (this.props.maxDate) {
      if (isAfter(this.props.date, this.props.maxDate)) {
        return true
      }
    }
    return false
  }

  render() {
    const { date, selectedDate } = this.props

    let cls = classNames('Day', {
      'Weekend': isWeekend(date),
      'Today': isToday(date),
      'BeforeMin': this.beforeMin(),
      'AfterMax': this.afterMax(),
      'Selected': format(selectedDate, 'YYYY-MM-DD') === format(date, 'YYYY-MM-DD')
    })

    return (
      <td className={cls} onClick={() => this.handleDayClick(date)}>
        {format(date, 'D')}
      </td>
    )
  }
}

export default Day
