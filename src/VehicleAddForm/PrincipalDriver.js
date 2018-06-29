import React from 'react'
import Fieldset from 'base/Fieldset'
import Select from 'base/Select'

class PrincipalDriver extends React.Component {
  render() {
    return (
      <fieldset>
        <Select
          name="registered_owner"
          label="Who is the vehicle's registered owner?"
          choices={this.props.drivers}
        />
        <Select
          name="principal_driver"
          label="Who is the vehicle's principal driver?"
          choices={this.props.drivers}
        />
      </fieldset>
    )
  }
}

export default Fieldset(PrincipalDriver)
