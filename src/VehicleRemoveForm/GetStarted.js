import React from 'react'
import Fieldset from 'base/Fieldset'
import Select from 'base/Select'
import PostalCode from 'base/PostalCode'
import Text from 'base/Text'
import Radio from 'base/Radio'
import Toggle from 'base/Toggle'

const pols = [
  { id: '0x0001' },
  { id: '0x0002' },
]

class GetStarted extends React.Component {
  render() {
    let choices = this.props.drivers.map(d =>
      [d.id, `${d.first_name} ${d.last_name}`]
    )
    return (
      <fieldset>
        <PostalCode
          name="postal_code"
          label="Postal Code"
        />
        <Radio
          name="vehicle_driver"
          label="Which driver should be assigned to this vehicle?"
          choices={[
            ['01', 'Steven Strange'],
            ['02', 'Black Widow'],
          ]}
        />
        <div className="ToggleGroup">
          <span>Which policies are this request for?</span>
          {pols.map(pol =>
            <Toggle
              key={pol.id}
              name={pol.id}
              toggleLabel={pol.id}
            />
          )}
        </div>
        <Select
          name="requester_name"
          label="Requester Name"
          choices={choices}
        />
        <Text
          name="effective_date"
          label="Effective Date"
        />
      </fieldset>
    )
  }
}

export default Fieldset(GetStarted)
