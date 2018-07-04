import React from 'react'
import { Pencil } from 'icons'

import './style.css'

class LicenceDateButton extends React.Component {

  dateClick = (e) => {
    e.preventDefault()
    this.props.licenceClick(this.props.licenceClass)
  }

  render() {
    const { date, licenceClass } = this.props
    return (
      <div className={licenceClass ? 'LicenceDateButton' : 'LicenceDateButton NoLicence'}>
        <span>{date.format('YYYY')}</span>
        <button onClick={this.dateClick}>
          <span>{this.props.licenceClass}</span>
          <strong>{date && date.format('MMMM Do, YYYY')}</strong>
          <Pencil />
        </button>
      </div>
    )
  }
}

export default LicenceDateButton
