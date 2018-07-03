import React from 'react'
import Date from 'base/Date'

import './style.css'

class Modal extends React.Component {
  render() {
    console.log(this.props)
    return (
      <div className="Modal">
        <div className="ModalBody">
          <button onClick={this.props.toggleModal}>x</button>
          <h4>{this.props.tierInProgress} licence date</h4>
          <Date />
        </div>
      </div>
    )
  }
}

export default Modal
