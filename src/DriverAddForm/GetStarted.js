import React from 'react'
import moment from 'moment'
import Fieldset from 'base/Fieldset'
import Toggle from 'base/Toggle'
import Select from 'base/Select'
import Date from 'base/Date'

const policies = [
  ['0x000001', '0x000001'],
  ['0x000002', '0x000002'],
]

class GetStarted extends React.Component {
  render() {
    return (
      <fieldset>
        <div className="ToggleGroup">
          <span>Which policies are this request for?</span>
          {policies.map(p =>
            <Toggle
              key={p[0]}
              name={p[0]}
              toggleLabel={p[1]}
            />
          )}
        </div>
        <Select
          name="requester_name"
          label="Who is requesting this change?"
          choices={this.props.drivers}
        />
        <Date
          name="effective_date"
          label="Effective Date"
          minDate={moment().startOf('day')}
          maxDate={moment().startOf('day').add(1, 'month')}
        />
      </fieldset>
    )
  }
}

export default Fieldset(GetStarted)
