import moment from 'moment'
import { afterToday, beforeToday } from 'dateServices'

test('after today returns true for all dates after start of today', () => {
  let middleOfToday = moment()
  expect(afterToday(middleOfToday)).toEqual(true)
})

test('before today returns true for all dates before start of today', () => {
  let yesterday = moment().subtract(1, 'days')
  expect(beforeToday(yesterday)).toEqual(true)
})
