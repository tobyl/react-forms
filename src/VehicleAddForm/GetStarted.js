import React from 'react'
import Fieldset from 'base/Fieldset'
import Radio from 'base/Radio'
import Select from 'base/Select'
import Date from 'base/Date'
import Text from 'base/Text'

const policies = [
  ['0x000001', '0x000001'],
  ['0x000002', '0x000002'],
]

class GetStarted extends React.Component {
  render() {
    return (
      <fieldset>
        <Radio
          name="request_policies"
          label="Policies"
          choices={policies}
        />
        <Select
          name="requester_name"
          label="Who is requesting this change?"
          choices={this.props.drivers}
        />
        <Date
          name="effective_date"
          label="Effective Date"
        />
      </fieldset>
    )
  }
}

export default Fieldset(GetStarted)
