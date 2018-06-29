import React from 'react'
import Form from 'base/Form'
import GetStarted from './GetStarted'
import VinLookup from './VinLookup'
import PrincipalDriver from './PrincipalDriver'
import VehicleDetails from './VehicleDetails'
import VehicleUsage from './VehicleUsage'
import VehicleEligibility from './VehicleEligibility'

const PolicyDrivers = [
  { id: '01', first_name: 'John', last_name: 'Doe' },
  { id: '02', first_name: 'Jane', last_name: 'Doe' },
]

const PolicyVehicles = [
  { id: 1, year: '2012', make: 'Ford', model: 'Focus' },
  { id: 2, year: '2015', make: 'Honda', model: 'Fit' },
]

const requesterName = [
  ['01', 'John Doe'],
  ['02', 'Jane Doe'],
  ['03', 'Elizabeth Doe'],
]

class VehicleAddForm extends React.Component {
  render() {
    return (
      <div>
        <GetStarted drivers={requesterName} />
        <VinLookup />
        <PrincipalDriver drivers={requesterName} />
        <VehicleDetails />
        <VehicleUsage />
        <VehicleEligibility />
      </div>
    )
  }
}

export default Form(VehicleAddForm)
