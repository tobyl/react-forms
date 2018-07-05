import React from 'react'

class YearNav extends React.Component {
  getYears = () => {
    return [
      '2000', '2001', '2002', '2003', '2004', '2005', '2006',
      '2007', '2008', '2009', '2010', '2011', '2012', '2013',
      '2014', '2015', '2016', '2017', '2018',
    ]
  }

  render() {
    const  { date } = this.props
    let currentYear = date.format('YYYY')
    console.log(currentYear)
    return (
      <div className="YearNav">
        <select value={currentYear}>
          <option>Select…</option>
          {this.getYears().map(yr =>
            <option key={yr} value={yr}>{yr}</option>
          )}
        </select>
      </div>
    )
  }
}

export default YearNav
