import React from 'react'
import moment from 'moment'
import classNames from 'classnames'

class Day extends React.Component {
  handleDayClick = (day) => {
    if (!this.beforeMin() && !this.afterMax()) {
      this.setState({ selected: true }, () =>
        this.props.dayClick(day)
      )
    }
  }

  beforeMin = () => {
    if (this.props.minDate) {
      if (this.props.day.isBefore(this.props.minDate)) {
        return true
      }
    }
    return false
  }

  afterMax = () => {
    if (this.props.maxDate) {
      if (this.props.day.isAfter(this.props.maxDate)) {
        return true
      }
    }
    return false
  }

  render() {
    const { day, selectedDate } = this.props
    let today = moment().startOf('day')
    let isWeekend = day.format('dddd') === 'Saturday' || day.format('dddd') === 'Sunday'
    let propsSelected = moment(selectedDate).startOf('day').isSame(day.startOf('day'))

    let cls = classNames('Day', {
      'Weekend': isWeekend,
      'Today': day.clone().startOf('day').isSame(today),
      'Selected': propsSelected,
      'BeforeMin': this.beforeMin(),
      'AfterMax': this.afterMax(),
    })

    return (
      <td className={cls} data-date={day.format('YYYY-MM-DD')} onClick={() => this.handleDayClick(day)}>
        {day.format('D')}
      </td>
    )
  }
}

export default Day
