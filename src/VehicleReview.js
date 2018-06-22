import React from 'react'
import Fieldset from './base/Fieldset'
import Text from './base/Text'

class VehicleReview extends React.Component {
  render() {
    return (
      <fieldset>
        <Text
          name={`effective_date_${this.props.prefix}`}
          label={`${this.props.prefix} Effective Date`}
        />
      </fieldset>
    )
  }
}

export default Fieldset(VehicleReview)
