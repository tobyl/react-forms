import React from 'react'
import { format, addMonths, subMonths } from 'date-fns'
import { Next, Previous } from 'icons'

class MonthNav extends React.Component {
  prevClick = (e) => {
    e.preventDefault()
    this.props.setDisplayDate(subMonths(this.props.date, 1))
  }

  nextClick = (e) => {
    e.preventDefault()
    this.props.setDisplayDate(addMonths(this.props.date, 1))
  }

  render() {
    const  { displayDate } = this.props
    return (
      <div className="MonthNav">
        <button className="Prev" onClick={this.prevClick}><Previous /></button>
        {format(displayDate, 'MMMM')}
        <button className="Next" onClick={this.nextClick}><Next /></button>
      </div>
    )
  }
}

export default MonthNav
