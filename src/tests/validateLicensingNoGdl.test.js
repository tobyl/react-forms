import React from 'react'
import LicenceGroup from 'VehicleRemoveForm/validateLicensing'

test('t3, no dates', () => {
  let group = new LicenceGroup(
    '1977-08-07', // dob
    'ON', // province
    false, // out of province
    'g', // licence class
    '', // t3
    '', // t2
    '', // t1
  )
  expect(group.visible()).toEqual({ t3: true, t2: false, t1: false })
  expect(group.toDestroy()).toEqual(['t2_date', 't1_date'])
  expect(group.fieldErrors()).toEqual({ t3: '', t2: '', t1: '' })
})

test('t3 date only', () => {
  let group = new LicenceGroup(
    '1977-08-07', // dob
    'ON', // province
    false, // out of province
    'g', // licence class
    '1977-08-07', // t3
    '', // t2
    '', // t1
  )
  expect(group.visible()).toEqual({ t3: true, t2: false, t1: false })
  expect(group.toDestroy()).toEqual(['t2_date', 't1_date'])
  expect(group.fieldErrors()).toEqual({ t3: '', t2: '', t1: '' })
})

test('t3, t3 date with gdl', () => {
  let group = new LicenceGroup(
    '1977-08-07', // dob
    'ON', // province
    false, // out of province
    'g', // licence class
    '1995-01-01', // t3
    '', // t2
    '', // t1
  )
  expect(group.visible()).toEqual({ t3: true, t2: true, t1: true })
  expect(group.toDestroy()).toEqual([])
  expect(group.fieldErrors()).toEqual({ t3: '', t2: '', t1: '' })
})

test('t3, t3 same as gdl', () => {
  let group = new LicenceGroup(
    '1977-08-07', // dob
    'ON', // province
    false, // out of province
    'g', // licence class
    '1994-04-01', // t3
    '', // t2
    '', // t1
  )
  expect(group.visible()).toEqual({ t3: true, t2: false, t1: false })
  expect(group.toDestroy()).toEqual(['t2_date', 't1_date'])
  expect(group.fieldErrors()).toEqual({ t3: '', t2: '', t1: '' })
})
