import React from 'react'
import Fieldset from 'base/Fieldset'
import DataItem from './DataItem'

import './style.css'

class ConfirmPage extends React.Component {
  render() {
    return (
      <fieldset className="FinalConfirm">
        <h3>Requested changes to policy number #1234567</h3>
        <ul>
        {Object.keys(this.props.formData).map(x =>
          <DataItem
            key={x}
            label={x}
            value={this.props.formData[x]}
            error={this.props.errors[x]}
          />
        )}
      </ul>
      </fieldset>
    )
  }
}

export default Fieldset(ConfirmPage)
