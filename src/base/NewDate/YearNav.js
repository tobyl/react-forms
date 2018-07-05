import React from 'react'
import moment from 'moment'
import { SelectChevron } from 'icons'

class YearNav extends React.Component {
  getYears = () => {
    const { minDate, maxDate } = this.props
    let years = []
    let start = minDate ? minDate.clone() : moment('1900-01-01')
    let end = maxDate ? maxDate.clone() : moment()

    let yr = start

    while (yr <= end) {
      years.push(yr.format('YYYY'))
      yr = yr.clone().add(1, 'y')
    }

    return years
  }

  yearChange = (e) => {
    let nextDate = this.props.date.set('year', e.target.value)
    this.props.setDate(nextDate)
  }

  render() {
    const  { date } = this.props
    return (
      <div className="YearNav" style={{ position: 'relative' }}>
        <select value={date.format('YYYY')} onChange={this.yearChange}>
          <option>Select…</option>
          {this.getYears().map(yr =>
            <option key={yr} value={yr}>{yr}</option>
          )}
        </select>
        <SelectChevron />
      </div>
    )
  }
}

export default YearNav
