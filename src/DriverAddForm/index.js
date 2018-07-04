import React from 'react'
import Form from 'base/Form'
import GetStarted from './GetStarted'
import LicenceDates from './LicenceDates'
import ConfirmPage from 'base/ConfirmPage'

const requesterName = [
  ['01', 'John Doe'],
  ['02', 'Jane Doe'],
  ['03', 'Elizabeth Doe'],
]

class DriverAddForm extends React.Component {
  render() {
    return (
      <div>
        <GetStarted drivers={requesterName} />
        <LicenceDates />
        <ConfirmPage
          drivers={requesterName}
        />
      </div>
    )
  }
}

export default Form(DriverAddForm)
