import React from 'react'
import moment from 'moment'
import classNames from 'classnames'

class Day extends React.Component {
  handleDayClick = (date) => {
    if (!this.beforeMin() && !this.afterMax()) {
      this.setState({ selected: true }, () =>
        this.props.setDate(date)
      )
    }
  }

  beforeMin = () => {
    if (this.props.minDate) {
      if (this.props.date.isBefore(this.props.minDate)) {
        return true
      }
    }
    return false
  }

  afterMax = () => {
    if (this.props.maxDate) {
      if (this.props.date.isAfter(this.props.maxDate)) {
        return true
      }
    }
    return false
  }

  render() {
    const { date } = this.props
    let today = moment().startOf('day')
    let isWeekend = date.format('dddd') === 'Saturday' || date.format('dddd') === 'Sunday'

    let cls = classNames('Day', {
      'Weekend': isWeekend,
      'Today': date.clone().startOf('day').isSame(today),
      'BeforeMin': this.beforeMin(),
      'AfterMax': this.afterMax(),
    })

    return (
      <td className={cls} onClick={() => this.handleDayClick(date)}>
        {date.format('D')}
      </td>
    )
  }
}

export default Day
