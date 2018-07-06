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

  getWeekDays = (wk) => {
    let start = startOfISOWeek(setISOWeek(new Date(), wk))
    let end = endOfISOWeek(setISOWeek(new Date(), wk))
    return eachDay(start, end)
  }

  displayMonth = (date) => {
    let start = startOfMonth(date)
    let end = endOfMonth(date)
    let firstWeek = getISOWeek(start)
    let lastWeek = getISOWeek(end)

    return this.getWeeks(firstWeek, lastWeek).map(wk =>
      <tr key={wk}>
        {this.getWeekDays(wk).map(day =>
            <Day
              key={format(day, 'DD')}
              date={day}
              selectedDate={this.props.selectedDate}
              minDate={this.props.minDate}
              maxDate={this.props.maxDate}
              setDate={this.props.setDate}
            />
        )}
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
            {this.displayMonth(this.props.date)}
          </tbody>
        </table>
      </div>
    )
  }
}

export default DatePicker
