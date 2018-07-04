import React from 'react'
import Form from 'base/Form'
import GetStarted from 'base/common/GetStarted'
import LicenceDates from './LicenceDates'
import VinLookup from './VinLookup'
import PrincipalDriver from './PrincipalDriver'
import VehicleDetails from './VehicleDetails'
import VehicleUsage from './VehicleUsage'
import VehicleEligibility from './VehicleEligibility'
import ConfirmPage from 'base/ConfirmPage'
import { requesterName } from 'helpers'

class VehicleAddForm extends React.Component {
  render() {
    return (
      <div>
        <GetStarted drivers={requesterName} />
        <LicenceDates />
        <VinLookup />
        <PrincipalDriver drivers={requesterName} />
        <VehicleDetails />
        <VehicleUsage />
        <VehicleEligibility />
        <ConfirmPage drivers={requesterName} />
      </div>
    )
  }
}

export default Form(VehicleAddForm)
