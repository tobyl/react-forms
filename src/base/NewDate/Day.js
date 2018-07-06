import React from 'react'
import { format, isSameDay, isWeekend, isToday, isBefore, isAfter } from 'date-fns'
import classNames from 'classnames'

class Day extends React.Component {

  handleDayClick = (date) => {
    const { minDate, maxDate } = this.props
    if (!isBefore(date, minDate) && !isAfter(date, maxDate)) {
      this.props.setSelectedDate(date)
    }
  }

  render() {
    const { date, selectedDate, minDate, maxDate } = this.props

    let cls = classNames('Day', {
      'Weekend': isWeekend(date),
      'Today': isToday(date),
      'BeforeMin': isBefore(date, minDate),
      'AfterMax': isAfter(date, maxDate),
      'Selected': isSameDay(selectedDate, date)
    })

    return (
      <td className={cls} onClick={() => this.handleDayClick(date)}>
        {format(date, 'D')}
      </td>
    )
  }
}

export default Day
