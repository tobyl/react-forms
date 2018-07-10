import React from 'react'
import { format } from 'date-fns'
import { Pencil } from 'icons'

import './style.css'

class LicenceDateButton extends React.Component {

  dateClick = (e) => {
    e.preventDefault()
    this.props.licenceClick(this.props.licenceClass)
  }

  render() {
    const { date, yearOnly } = this.props
    return (
      <div className={yearOnly ? 'LicenceDateButton YearOnly' : 'LicenceDateButton'}>
        <span>
          {yearOnly ? yearOnly : format(date, 'YYYY')}
        </span>
        {!yearOnly && <button onClick={this.dateClick}>
          <span>{this.props.licenceClass}</span>
          <strong>{format(date, 'MMMM D, YYYY')}</strong>
          <Pencil />
        </button>}
      </div>
    )
  }
}

export default LicenceDateButton
