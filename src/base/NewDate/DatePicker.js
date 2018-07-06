import React from 'react'
import {
  format, eachDay, getISOWeek, startOfMonth, endOfMonth,
  startOfISOWeek, endOfISOWeek, setISOWeek,
} from 'date-fns'
import Day from './Day'

class DatePicker extends React.Component {
  getWeeks = (first, last) => {
    let weeks = []
    for (let i = first; i < last + 1; i++) {
      weeks.push(i)
    }
    return weeks
  }

  getWeekDays = (wk, date) => {
    let start = startOfISOWeek(setISOWeek(date, wk))
    let end = endOfISOWeek(setISOWeek(date, wk))
    return eachDay(start, end)
  }

  displayMonth = (date) => {
    let start = startOfMonth(date)
    let end = endOfMonth(date)
    let firstWeek = getISOWeek(start)
    let lastWeek = getISOWeek(end)

    return this.getWeeks(firstWeek, lastWeek).map(wk =>
      <tr key={wk}>
        {this.getWeekDays(wk, date).map(day => {
          return (
            <Day
              key={format(day, 'DD')}
              date={day}
              selectedDate={this.props.selectedDate}
              minDate={this.props.minDate}
              maxDate={this.props.maxDate}
              setSelectedDate={this.props.setSelectedDate}
            />
          )
        })}
      </tr>
    )
  }

  render() {
    return (
      <div className="DatePicker">
        <table>
          <tbody>
            <tr>
              {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(d =>
                <th key={d}><small>{d}</small></th>
              )}
            </tr>
            {this.displayMonth(this.props.displayDate)}
          </tbody>
        </table>
      </div>
    )
  }
}

export default DatePicker
