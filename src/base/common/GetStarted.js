import React from 'react'
import moment from 'moment'
import Fieldset from 'base/Fieldset'
import Toggle from 'base/Toggle'
import Select from 'base/Select'
import Text from 'base/Text'
import NewDate from 'base/NewDate'

const policies = [
  ['0x000001', '0x000001'],
  ['0x000002', '0x000002'],
]

class GetStarted extends React.Component {
  state = { other: false }

  toggleOtherField = () => {
    let isOther = this.props.getValue('requester_name') === 'other'
    this.setState({ other: isOther }, () =>
      !isOther && this.props.destroy('requester_name_other')
    )
  }

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
          changeCallback={this.toggleOtherField}
        />
        {this.state.other &&
          <Text
            name="requester_name_other"
            label="Requester Name"
          />}
        <NewDate
          name="effective_date"
          label="Effective Date"
          selected={moment('2018-01-01')}
          minDate={moment().startOf('day')}
          maxDate={moment().startOf('day').add(1, 'month')}
        />
      </fieldset>
    )
  }
}

export default Fieldset(GetStarted)
