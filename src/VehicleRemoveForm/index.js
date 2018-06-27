import React from 'react'
import Form from 'base/Form'
import GetStarted from './GetStarted'
import DriverLicensing from './DriverLicensing'
import VehicleReview from './VehicleReview'
import VehicleUsage from './VehicleUsage'

const PolicyDrivers = [
  { id: '01', first_name: 'John', last_name: 'Doe' },
  { id: '02', first_name: 'Jane', last_name: 'Doe' },
]

const PolicyVehicles = [
  { id: 1, year: '2012', make: 'Ford', model: 'Focus' },
  { id: 2, year: '2015', make: 'Honda', model: 'Fit' },
]

class VehicleRemoveForm extends React.Component {
  render() {
    return (
      <div>
        <GetStarted
          drivers={PolicyDrivers}
        />
        <DriverLicensing />
        <VehicleUsage />
        {PolicyVehicles.map(v =>
          <VehicleReview
            key={v.id}
            prefix={v.id}
            fieldsetName={`Vehicle${v.id}`}
          />
        )}
      </div>
    )
  }
}

export default Form(VehicleRemoveForm)
