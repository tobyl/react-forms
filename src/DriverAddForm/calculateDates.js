import moment from 'moment'
import { twoDigitYearToFour } from 'services'

export const calculateDates = (dob, training, oop, tierInProgress = null, date = null) => {
  let gdlDate = moment('1994-04-01')

  let dates = {}

  if (tierInProgress && date) {
    dates[tierInProgress] = moment(date)
  } else {
    if (dob.clone().add(16, 'years').isAfter(gdlDate)) {
      dates['t1'] = dob.clone().add(16, 'years')
      dates['t2'] = dates['t1'].clone().add(8, 'months')
      dates['t3'] = dates['t2'].clone().add(1, 'years')
    } else {
      dates['t3'] = dob.clone().add(16, 'years')
    }
  }

  console.log('returning ', dates)

  return dates
}

export const extractDobFromLicence = (licence) => {
  // expects a valid licence number

  const lastSixChars = licence.substr(-6)
  let year = lastSixChars.substr(0, 2)
  let yearFull = twoDigitYearToFour(year)
  let month = lastSixChars.substr(2, 2)
  let day = lastSixChars.substr(4, 2)

  let dateOfBirth

  if (Number(month) > 0 && Number(month) < 13) {
    dateOfBirth = `${yearFull}-${month}-${day}`
  } else if (Number(month) > 50 && Number(month) < 63) {
    dateOfBirth = `${yearFull}-${moment().month(`${Number(month) - 51}`).format('MM')}-${day}`;
  }

  return dateOfBirth
}
