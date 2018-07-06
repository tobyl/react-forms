import { isValid, isToday, subYears, isAfter, isBefore } from 'date-fns'

export const labelToSlug = (label) => {
  if (label && !label.includes('-')) {
    if (label.match(/[0-9]+/g)) {
      return label.toLowerCase()
    }
    label = label.match(/[A-Z][a-z]+/g)
    if (label && label.length > 0) {
      label = label.join('-')
      return label.toLowerCase()
    }
  }
  return label.toLowerCase()
}

export const slugToLabel = (slug) => {
  if (slug) {
    slug = slug.replace('/', '').split('-')
    let withUpper = slug.map(x => x.charAt(0).toUpperCase() + x.slice(1))
    let newString = withUpper.join('')
    return newString
  }
  return slug
}

export const validPostalCode = (value) => {
  const first =  'abceghjklmnprstvxy'
  const second = 'abceghjklmnprstvwxyz'
  const postalRegex = new RegExp(`^[${first}]\\d[${second}]( )?\\d[${second}]\\d$`, 'i')
  if (value.match(postalRegex)) {
    return ''
  }
  return 'Invalid postal code'
}

export const validLicenceDate = (value) => {
  if (isValid(value)) {
    value = new Date(value)
    let today = new Date()
    if (isToday(value) || isAfter(value, today)) {
      return 'Must be before today'
    }
    if (isBefore(value, subYears(today, 100))) {
      return 'Must be within the last 100 years'
    }
  }
  return ''
}

export const delay = ms => new Promise(resolve => setTimeout(resolve, ms))

const vinRegex = new RegExp("^[ABCDEFGHJKLMNPRSTUVWXYZ1234567890]{17}$", "i")
const numbersRegex = new RegExp(/^[0-9]+$/)
const lettersRegex = new RegExp(/^[a-z]+$/, 'i')

export function validVin(value) {
  if (!value.match(vinRegex)) {
    return 'Invalid VIN'
  } else if (value.match(numbersRegex) || value.match(lettersRegex)) {
    return 'Invalid VIN'
  }
  return ''
}

export function isValidVin(value) {
  if (!value.match(vinRegex)) {
    return false
  } else if (value.match(numbersRegex) || value.match(lettersRegex)) {
    return false
  }
  return true
}

export function twoDigitYearToFour(year) {
  year = year.toString()

  const currentBaseYear = new Date().getFullYear().toString().substr(2,2);
  const currentLicenceYear = Number(currentBaseYear) - 16;

  if (Number(year) > currentLicenceYear) {
    year = `19${year}`;
  } else {
    year = `20${year}`;
  }

  return year;
}
