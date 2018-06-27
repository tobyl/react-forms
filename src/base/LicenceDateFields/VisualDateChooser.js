import React from 'react'
import VisualDatePicker from './VisualDatePicker'

import './style.css'

class VisualDateChooser extends React.Component {
  state = { visible: false }

  componentDidMount() {
    setTimeout(() => {
      this.setState({ visible: true })
    }, 600)
  }

  render() {
    return (
      <div className="VisualDateChooser">
        <div className="inner">
          {this.state.visible &&
            <VisualDatePicker
              setDate={this.props.setDate}
              change={this.props.change}
              momentDate={this.props.momentDate}
            />}
        </div>
      </div>
    )
  }
}

export default VisualDateChooser
