import moment from 'moment'
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
    dateOfBirth = `${yearFull}-${month}-${day}`
  } else if (Number(month) > 50 && Number(month) < 63) {
    dateOfBirth = `${yearFull}-${moment().month(`${Number(month) - 51}`).format('MM')}-${day}`;
  }
  return dateOfBirth
}
