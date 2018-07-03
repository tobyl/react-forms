import React from 'react'
import moment from 'moment'
import classNames from 'classnames'

class Day extends React.Component {
  state = { selected: false }

  handleDayClick = (day) => {
    this.setState({ selected: true }, () =>
      this.props.dayClick(day)
    )
  }

  render() {

    console.log(this.props.selectedDate)

    const { day, selectedDate } = this.props
    let today = moment().startOf('day')
    let isWeekend = day.format('dddd') === 'Saturday' || day.format('dddd') === 'Sunday'
    let propsSelected = moment(selectedDate).startOf('day').isSame(day.startOf('day'))

    let cls = classNames('Day', {
      'Weekend': isWeekend,
      'Today': day.clone().startOf('day').isSame(today),
      'Selected': propsSelected || this.state.selected,
    })

    return (
      <td className={cls} data-date={day.format('YYYY-MM-DD')} onClick={() => this.handleDayClick(day)}>
        {day.format('D')}
      </td>
    )
  }
}

export default Day
