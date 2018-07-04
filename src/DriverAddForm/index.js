import React from 'react'
import Form from 'base/Form'
import GetStarted from 'base/common/GetStarted'
import LicenceDates from './LicenceDates'
import ConfirmPage from 'base/ConfirmPage'
import { requesterName } from 'helpers'

class DriverAddForm extends React.Component {
  render() {
    return (
      <div>
        <GetStarted drivers={requesterName} />
        <LicenceDates />
        <ConfirmPage />
      </div>
    )
  }
}

export default Form(DriverAddForm)
