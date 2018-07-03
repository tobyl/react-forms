import React from 'react'
import moment from 'moment'
import Day from './Day'
import MonthNav from './MonthNav'

moment.locale('en-CA', {
  weekdaysShort: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
})

class DatePicker extends React.Component {
  state = {
    date: moment(),
  }

  displayMonth = (date) => {
    let weeks = []
    const startWeek = date.clone().startOf('month').week()
    const endWeek = date.clone().endOf('month').week()
    for (let week = startWeek; week < endWeek + 1; week++) {
      weeks.push(week)
    }
    return weeks
  }

  dayClick = (day) => {
    this.setState({ date: day }, () =>
      this.props.setDate(day)
    )
  }

  setMonth = (date) => {
    this.setState({ date: date })
  }

  displayWeek = (week) => {

    var startOfWeek = this.state.date.clone().week(week).startOf('isoWeek')
    var endOfWeek = this.state.date.clone().week(week).endOf('isoWeek')
    let currentMonth = this.state.date.clone().format('MMM')

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
            day={day}
            currentMonth={currentMonth}
            selectedDate={this.props.getValue(this.props.name)}
            dayClick={this.dayClick}
          />
        ))}
      </tr>
    )
  }

  render() {
    return (
      <div className="DatePicker">
        <MonthNav date={this.state.date} setMonth={this.setMonth} />
        <table>
          <tbody>
            <tr>
              {moment.weekdaysShort().map(d => <th key={d}><small>{d}</small></th>)}
            </tr>
            {this.displayMonth(this.state.date).map(week => this.displayWeek(week))}
          </tbody>
        </table>
      </div>
    )
  }
}

export default DatePicker
