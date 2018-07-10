import React from 'react'
import PropTypes from 'prop-types'
import { Close } from 'icons'

import './style.css'

class Modal extends React.Component {
  render() {
    return this.props.show ? (
      <div className="Modal">
        <div className="ModalBody">
          {this.props.children}
          <button className="ModalClose" onClick={this.props.toggle}>
            <Close />
          </button>
        </div>
      </div>
    ) : null
  }
}

Modal.propTypes = {
  show: PropTypes.bool.isRequired,
}

export default Modal
