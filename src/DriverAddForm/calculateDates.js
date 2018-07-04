import moment from 'moment'

export const calculateDates = (dob, training, oop) => {
  let gdlDate = moment('1994-04-01')

  let dates = {}

  if (dob.clone().add(16, 'years').isAfter(gdlDate)) {
    dates['t1'] = dob.clone().add(16, 'years')
    dates['t2'] = dates['t1'].clone().add(8, 'months')
    dates['t3'] = dates['t2'].clone().add(1, 'years')
  } else {
    dates['t3'] = dob.clone().add(16, 'years')
  }

  return dates
}
