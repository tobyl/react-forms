import React from 'react'
import Fieldset from 'base/Fieldset'
import Radio from 'base/Radio'

class PrincipalDriver extends React.Component {
  render() {
    return (
      <fieldset>
        <Radio
          name="registered_owner"
          label="Who is the vehicle's registered owner?"
          choices={this.props.drivers}
        />
        <Radio
          name="principal_driver"
          label="Who is the vehicle's principal driver?"
          choices={this.props.drivers}
        />
      </fieldset>
    )
  }
}

PrincipalDriver.displayName = 'PrincipalDriver'
export default Fieldset(PrincipalDriver, 'PrincipalDriver')
