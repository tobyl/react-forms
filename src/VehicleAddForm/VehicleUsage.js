import React from 'react'
import Fieldset from 'base/Fieldset'
import Select from 'base/Select'
import Text from 'base/Text'
import { usageChoices } from 'helpers'
import {
  mustBeNumber,
  lessThanEightChars,
  cannotBeZero,
} from 'cleans'

class VehicleUsage extends React.Component {
  state = {
    current: '',
  }

  componentDidMount() {
    const usage = this.props.getValue('vehicle_usage')
    this.usageChange(usage)
  }

  usageChange = () => {
    let usage = this.props.getValue('vehicle_usage')
    this.setState({ current: usage }, () =>
      this.fieldsToDestroy()
    )
  }

  fieldsToDestroy = () => {
    let toDestroy = []
    switch (this.state.current) {
      case 'pleasure':
        toDestroy.push('daily_kms')
        toDestroy.push('business_annual_kms')
        break
      case 'commuting':
        toDestroy.push('business_annual_kms')
        break
      case 'business':
        toDestroy = []
        break
      default:
        toDestroy.push('annual_kms')
        toDestroy.push('daily_kms')
        toDestroy.push('business_annual_kms')
    }
    this.props.destroy(toDestroy)
  }

  render() {
    const { current } = this.state
    return (
      <fieldset>
        <Select
          name="vehicle_usage"
          label="Vehicle Usage"
          changeCallback={this.usageChange}
          choices={usageChoices}
        />
        {(current === 'pleasure' || current === 'commuting' || current === 'business') &&
          <Text
            name="annual_kms"
            label="Annual KMs"
            cleans={[mustBeNumber, lessThanEightChars, cannotBeZero]}
          />}
        {(current === 'commuting' || current === 'business') &&
          <Text
            name="daily_kms"
            label="Daily KMs"
            cleans={[mustBeNumber, lessThanEightChars, cannotBeZero]}
          />}
        {current === 'business' &&
          <Text
            name="business_annual_kms"
            label="Business Annual KMs"
            cleans={[mustBeNumber, lessThanEightChars, cannotBeZero]}
          />}
      </fieldset>
    )
  }
}

export default Fieldset(VehicleUsage)
