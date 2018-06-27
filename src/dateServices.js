import moment from 'moment'

export const dateDobDelta = (value, dob) => {
  if (value && dob) {
    console.log('val and dob: ', value, dob)
  }
  return false
}

export const validDate = (value) => {
  if (value) {
    if (moment(value, 'YYYY-MM-DD', true)) {
      if (moment(value, 'YYYY-MM-DD', true).isValid()) {
        return moment(value)
      }
    }
  }
  return false
}

export const afterToday = (date) => {
  let today = moment().startOf('day')
  if (date.isSame(today) || date.isAfter(today)) {
    return true
  }
  return false
}

export const beforeToday = (date) => {
  let today = moment().startOf('day')
  if (date.isSame(today) || date.isBefore(today)) {
    return true
  }
  return false
}
