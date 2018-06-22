import moment from 'moment'

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
  if (moment(value, 'YYYY-MM-DD', true).isValid()) {
    value = moment(value).startOf('day')
    let today = moment().startOf('day')
    let startOfTime = moment().subtract(100, 'years').startOf('day')
    if (value.isSame(today) || value.isAfter(today)) {
      return 'Must be before today'
    }
    if (value.isBefore(startOfTime)) {
      return 'Must be within the last 100 years'
    }
  }
  return ''
}

export const delay = ms => new Promise(resolve => setTimeout(resolve, ms))
