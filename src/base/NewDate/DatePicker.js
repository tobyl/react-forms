import React from 'react'
import moment from 'moment'
import Day from './Day'

moment.updateLocale('en-CA', {
  weekdaysShort: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
})

class DatePicker extends React.Component {
  displayMonth = (date) => {
    let weeks = []
    const startWeek = date.clone().startOf('month').week()
    const endWeek = date.clone().endOf('month').week()
    for (let week = startWeek; week < endWeek + 1; week++) {
      weeks.push(week)
    }
    return weeks
  }

  displayWeek = (week) => {

    const { date, minDate, maxDate, setDate, selectedDate } = this.props

    var startOfWeek = date.clone().week(week).startOf('isoWeek')
    var endOfWeek = date.clone().week(week).endOf('isoWeek')

    var days = []
    var day = startOfWeek

    while (day <= endOfWeek) {
      days.push(day)
      day = day.clone().add(1, 'd')
    }

    return (
      <tr key={week}>
        {days.map((day, i) => (
          <Day
            key={i}
            date={day}
            selectedDate={selectedDate}
            minDate={minDate}
            maxDate={maxDate}
            setDate={setDate}
          />
        ))}
      </tr>
    )
  }

  render() {
    return (
      <div className="DatePicker">
        <table>
          <tbody>
            <tr>
              {moment.weekdaysShort().map(d => <th key={d}><small>{d}</small></th>)}
            </tr>
            {this.displayMonth(this.props.date).map(week => this.displayWeek(week))}
          </tbody>
        </table>
      </div>
    )
  }
}

export default DatePicker
