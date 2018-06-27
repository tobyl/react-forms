import React from 'react'
import moment from 'moment'
import Day from './Day'

moment.locale('en-CA', {
  weekdaysShort: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
})

class VisualDatePicker extends React.Component {
  state = {
    date: this.props.momentDate ? this.props.momentDate : moment()
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

  dayClick = () => {
    this.props.setDate('t1', this.state.date)
    let e = {
      target: {
        value: this.state.date.format('YYYY-MM-DD')
      }
    }
    this.props.change(e)
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
            isSelected={day.startOf('day').isSame(this.state.date.startOf('day'))}
            dayClick={this.dayClick}
          />
        ))}
      </tr>
    )
  }

  getMonths = () => moment.months().map(m => [m, m])

  render() {
    return (
      <div className="VisualDatePicker">
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

export default VisualDatePicker
