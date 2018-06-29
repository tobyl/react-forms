import React from 'react'
import moment from 'moment'
import classNames from 'classnames'

const Day = ({ day, isSelected, currentMonth, dayClick }) => {

  let isToday = moment().startOf('day').isSame(day.startOf('day'))
  let isWeekend = day.format('dddd') === 'Saturday' || day.format('dddd') === 'Sunday'
  let isInCurrentMonth = day.format('MMM') === currentMonth

  let cls = classNames('Day', {
    'Today': isToday,
    'Weekend': isWeekend,
    'Selected': isSelected,
    'OutsideCurrentMonth': !isInCurrentMonth,
  })

  return (
    <td className={cls} data-date={day.format('YYYY-MM-DD')} onClick={() => dayClick(day)}>
      {day.format('D')}
    </td>
  )
}

export default Day
