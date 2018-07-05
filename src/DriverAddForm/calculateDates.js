import moment from 'moment'
import { twoDigitYearToFour } from 'services'

let gdlDate = moment('1994-04-01')

export const calculateDates = (dob, training, oop, tierInProgress = null, date = null) => {

  let dates = {
    t1: calculateT1(dob, tierInProgress, date),
    t2: calculateT2(dob, tierInProgress, date),
    t3: calculateT3(dob, tierInProgress, date),
  }

  return dates
}

const calculateT1 = (dob, tierInProgress, date) => {
  if (tierInProgress === 't1') {
    console.log('we are in t1 in progress ', date)
    return moment(date)
  }
  return dob.clone().add(16, 'years')
}

const calculateT2 = (dob, tierInProgress, date) => {
  if (tierInProgress === 't2') {
    console.log('we are in t2 in progress ', date)
    return moment(date)
  }
  return dob.clone().add(16, 'years').add(8, 'months')
}

const calculateT3 = (dob, tierInProgress, date) => {
  if (tierInProgress === 't3') {
    console.log('we are in t3 in progress ', date)
    return moment(date)
  }
  return dob.clone().add(16, 'years').add(8, 'months').add(1, 'years')
}

// utility functions for licensing

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
