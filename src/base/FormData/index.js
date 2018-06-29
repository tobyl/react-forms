import React from 'react'
import DataItem from './DataItem'
import { List } from 'icons'

import './style.css'

class FormData extends React.Component {
  state = { visible: true }

  toggleList = () => {
    this.setState({ visible: !this.state.visible })
  }

  render() {
    return (
      <div className="FormData">
        {this.state.visible && (
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
        )}
        <button onClick={this.toggleList}><List /></button>
      </div>
    )
  }
}

export default FormData
