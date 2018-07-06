import React from 'react'
import { format, setYear } from 'date-fns'
import { SelectChevron } from 'icons'

class YearNav extends React.Component {
  getYears = () => {
    const { minDate, maxDate } = this.props
    let start = minDate ? new Date(minDate) : new Date('1900-01-01')
    let end = maxDate ? new Date(maxDate) : new Date()

    let firstYear = Number(format(start, 'YYYY'))
    let lastYear = Number(format(end, 'YYYY'))

    let yrs = []

    for (let i = firstYear; i < lastYear + 2; i++) {
      yrs.push(i)
    }

    return yrs
  }

  yearChange = (e) => {
    let nextDate = setYear(this.props.date, e.target.value)
    this.props.setDisplayDate(nextDate)
  }

  render() {
    const  { date } = this.props
    return (
      <div className="YearNav" style={{ position: 'relative' }}>
        <select value={format(date, 'YYYY')} onChange={this.yearChange}>
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
