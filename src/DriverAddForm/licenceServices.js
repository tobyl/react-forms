import { format } from 'date-fns'

import { twoDigitYearToFour } from 'services'

export const extractDobFromLicence = (licence) => {
  // expects a valid licence number
  const lastSixChars = licence.substr(-6)
  let year = lastSixChars.substr(0, 2)
  let yearFull = twoDigitYearToFour(year)
  let month = lastSixChars.substr(2, 2)
  let day = lastSixChars.substr(4, 2)

  let dateOfBirth

  if (Number(month) > 0 && Number(month) < 13) {
    dateOfBirth = new Date(yearFull, month, day)
  } else if (Number(month) > 50 && Number(month) < 63) {
    dateOfBirth = new Date(yearFull, Number(month) - 51, day)
  }
  return dateOfBirth
}

export const getYearsArray = (dates) => {
  let keys = Object.keys(dates)
  if (keys.length > 0) {

    let first = dates[keys[0]]
    let last = dates[keys[keys.length - 1]]

    // let first = new Date(2001, 1, 1)
    // let last = new Date(2015, 1, 1)

    let firstYear = Number(format(first, 'YYYY'))
    let lastYear = Number(format(last, 'YYYY'))

    let yrs = []

    for (let i = firstYear; i < lastYear + 1; i++) {
      yrs.push(i)
    }

    return yrs
  }
}
