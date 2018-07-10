import { isValid, isToday, isAfter, isBefore } from 'date-fns'

export const validDate = (value) => {
  return isValid(date)
}

export const afterToday = (date) => {
  let today = new Date()
  return isToday(date) || isAfter(date, today)
}

export const beforeToday = (date) => {
  let today = new Date()
  return isToday(date) || isBefore(date, today)
}
