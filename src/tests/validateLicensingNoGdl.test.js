import React from 'react'
import moment from 'moment'
import LicenceGroup from 'VehicleRemoveForm/validateLicensing'

test('t3, no dates', () => {
  let group = new LicenceGroup(
    '1977-08-07', // dob
    'ON', // province
    'g', // licence class
    false, // out of province
    '', // t3
    '', // t2
    '', // t1
  )
  expect(group.visible()).toEqual({ t3: true, t2: false, t1: false })
  expect(group.toDestroy()).toEqual(['t2_date', 't1_date'])
  expect(group.fieldErrors()).toEqual({ t3_date: '', t2_date: '', t1_date: '' })
})

test('t3 date only', () => {
  let group = new LicenceGroup(
    '1977-08-07', // dob
    'ON', // province
    'g', // licence class
    false, // out of province
    '1977-08-07', // t3
    '', // t2
    '', // t1
  )
  expect(group.visible()).toEqual({ t3: true, t2: false, t1: false })
  expect(group.toDestroy()).toEqual(['t2_date', 't1_date'])
  expect(group.fieldErrors()).toEqual({ t3_date: '', t2_date: '', t1_date: '' })
})

test('t3, t3 date with gdl', () => {
  let group = new LicenceGroup(
    '1977-08-07', // dob
    'ON', // province
    'g', // licence class
    false, // out of province
    '1995-01-01', // t3
    '', // t2
    '', // t1
  )
  expect(group.visible()).toEqual({ t3: true, t2: true, t1: true })
  expect(group.toDestroy()).toEqual([])
  expect(group.fieldErrors()).toEqual({ t3_date: '', t2_date: '', t1_date: '' })
})

test('t3, t3 date same as gdl date', () => {
  let group = new LicenceGroup(
    '1977-08-07', // dob
    'ON', // province
    'g', // licence class
    false, // out of province
    '1994-04-01', // t3
    '', // t2
    '', // t1
  )
  expect(group.visible()).toEqual({ t3: true, t2: false, t1: false })
  expect(group.toDestroy()).toEqual(['t2_date', 't1_date'])
  expect(group.fieldErrors()).toEqual({ t3_date: '', t2_date: '', t1_date: '' })
})

test('t3 after today', () => {
  let tomorrow = moment().add(1, 'days').format('YYYY-MM-DD')
  let group = new LicenceGroup(
    '1977-08-07', // dob
    'ON', // province
    'g', // licence class
    false, // out of province
    tomorrow, // t3
    '', // t2
    '', // t1
  )
  expect(group.visible()).toEqual({ t3: true, t2: true, t1: true })
  expect(group.toDestroy()).toEqual([])
  expect(group.fieldErrors()).toEqual({
    t3_date: 'Date cannot be after today',
    t2_date: '',
    t1_date: '',
  })
})
