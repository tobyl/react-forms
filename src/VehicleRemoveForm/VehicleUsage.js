import React from 'react'
import Fieldset from 'base/Fieldset'
import Select from 'base/Select'
import Text from 'base/Text'

class VehicleUsage extends React.Component {
  state = {
    current: '',
  }

  usageChange = () => {
    let usage = this.props.getValue('vehicle_usage')
    this.setState({ current: usage }, () =>
      this.fieldsToDestroy()
    )
  }

  fieldsToDestroy = () => {
    switch (this.state.current) {
      case 'pleasure':
        this.props.destroy(['daily_kms', 'business_annual_kms'])
        break
      case 'commuting':
        this.props.destroy(['business_annual_kms'])
        break
      case 'business':
        this.props.destroy([])
        break
      default:
        // something?
    }
  }

  render() {
    const { current } = this.state
    return (
      <fieldset>
        <Select
          name="vehicle_usage"
          label="Vehicle Usage"
          changeCallback={this.usageChange}
          choices={[
            ['pleasure', 'Pleasure'],
            ['commuting', 'Commuting'],
            ['business', 'Business'],
          ]}
        />
        {(current === 'pleasure' || current === 'commuting' || current === 'business') &&
          <Text
            name="annual_kms"
            label="Annual KMs"
          />}
        {current === 'commuting' &&
          <Text
            name="daily_kms"
            label="Daily KMs"
          />}
        {current === 'business' &&
          <Text
            name="business_annual_kms"
            label="Business Annual KMs"
          />}
      </fieldset>
    )
  }
}

export default Fieldset(VehicleUsage)
