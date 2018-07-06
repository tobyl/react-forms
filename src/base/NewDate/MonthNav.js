import React from 'react'
import { format } from 'date-fns'
import { Next, Previous } from 'icons'

class MonthNav extends React.Component {
  prevClick = (e) => {
    e.preventDefault()
    this.props.setDate(this.props.date.subtract(1, 'months'))
  }

  nextClick = (e) => {
    e.preventDefault()
    this.props.setDate(this.props.date.add(1, 'months'))
  }

  render() {
    const  { date } = this.props
    return (
      <div className="MonthNav">
        <button className="Prev" onClick={this.prevClick}><Previous /></button>
        {format(date, 'MMMM')}
        <button className="Next" onClick={this.nextClick}><Next /></button>
      </div>
    )
  }
}

export default MonthNav
