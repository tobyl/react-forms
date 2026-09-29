import React from 'react'
import Fieldset from 'base/Fieldset'
import Text from 'base/Text'
import Select from 'base/Select'
import Toggle from 'base/Toggle'
import {
  relationshipChoices,
  maritalChoices,
  authChoices,
} from 'helpers'

class DriverDetails extends React.Component {
  state = { firstName: '' }

  firstNameChanged = () => {
    let name = this.props.getValue('first_name')
    this.setState({ firstName: name })
  }

  render() {
    const { firstName } = this.state
    return (
      <fieldset>
        <Text
          name="first_name"
          label="First Name"
          changeCallback={this.firstNameChanged}
        />
        <Text
          name="last_name"
          label="Last Name"
        />
        <Select
          name="relationship_status"
          label={`How do you know ${firstName || 'the driver'}?`}
          choices={relationshipChoices}
        />
        <Toggle
          name="out_of_province_history"
          toggleLabel={`Does ${firstName || 'the driver'} have any out of province licence history?`}
        />
        <Text
          name="drivers_licence_number"
          label="Driver's Licence Number"
        />
        <Select
          name="marital_status"
          label={`What is ${firstName || 'the driver'}'s marital status?`}
          choices={maritalChoices}
        />
        <Select
          name="authorization_status"
          label={`Should ${firstName || 'the driver'} be allowed to call in and discuss your insurance policy?`}
          choices={authChoices}
        />
      </fieldset>
    )
  }
}

DriverDetails.displayName = 'DriverDetails'
export default Fieldset(DriverDetails, 'DriverDetails')
