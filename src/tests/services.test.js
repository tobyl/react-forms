import React from 'react'
import { labelToSlug, slugToLabel } from './services'

test('labelToSlug accepts dynamically numbered fieldsets', () => {
  expect(labelToSlug('Vehicle1')).toEqual('vehicle1')
  expect(labelToSlug('1Vehicle')).toEqual('1vehicle')
  expect(labelToSlug('01Vehicle')).toEqual('01vehicle')
  expect(labelToSlug('Vehicle01')).toEqual('vehicle01')
})

test('labelToSlug returns a hyphen-separated lowercase string', () => {
  expect(labelToSlug('GetStarted')).toEqual('get-started')
  expect(labelToSlug('LicenceDates')).toEqual('licence-dates')
})

test('slugToLabel returns a single titlecased string', () => {
  expect(slugToLabel('get-started')).toEqual('GetStarted')
  expect(slugToLabel('licence-details')).toEqual('LicenceDetails')
  expect(slugToLabel('01Vehicle')).toEqual('01Vehicle')
  expect(slugToLabel('Vehicle01')).toEqual('Vehicle01')
})
