import React from 'react'
import PropTypes from 'prop-types'
import Field from '../Field'
import { Pencil } from 'icons'

import './style.css'

class LicenceDateButton extends React.Component {

  getLicenceClass = (licenceClass) => {
    if (licenceClass === 't3') {
      return 'G'
    } else if (licenceClass === 't2') {
      return 'G2'
    } else {
      return 'G1'
    }
  }

  dateClick = (e) => {
    e.preventDefault()
    this.props.toggleModal(this.props.licenceClass)
  }

  render() {
    const { date, momentDate, licenceClass, setDate } = this.props
    return (
      <div className={licenceClass ? 'LicenceDateButton' : 'LicenceDateButton NoLicence'}>
        <span>{date}</span>
        <button onClick={this.dateClick}>
          <span>{this.getLicenceClass(licenceClass)}</span>
          <strong>{momentDate && momentDate.format('MMMM Do YYYY')}</strong>
          <Pencil />
        </button>
      </div>
    )
  }
}

export default LicenceDateButton
