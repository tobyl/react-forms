import React from 'react'
import Fieldset from 'base/Fieldset'
import Radio from 'base/Radio'
import Select from 'base/Select'
import Date from 'base/Date'
import Text from 'base/Text'
import { provinces, vehicleCondition } from 'helpers'

class VehicleDetails extends React.Component {
  state = { kmFieldVisible: false }

  showKmField = () => {
    let condition = this.props.getValue('vehicle_condition')
    if (condition === 'new' || condition === 'demo') {
      this.setState({ kmFieldVisible: true })
    } else {
      this.setState({ kmFieldVisible: false }, () =>
        this.props.destroy('kms_at_purchase')
      )
    }
  }

  render() {
    return (
      <fieldset>
        <Select
          name="vehicle_province"
          label="What province is this vehicle registered in"
          choices={provinces}
        />
        <Text
          name="vehicle_price"
          label="What is the price of this vehicle (with tax, before trade-in)?"
        />
        <Select
          name="vehicle_condition"
          label="What is the condition of this vehicle?"
          choices={vehicleCondition}
          changeCallback={this.showKmField}
        />
        {this.state.kmFieldVisible &&
          <Text
            name="kms_at_purchase"
            label="KMs at time of purchase"
          />}
      </fieldset>
    )
  }
}

export default Fieldset(VehicleDetails)
