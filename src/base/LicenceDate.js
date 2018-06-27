import React from 'react'
import PropTypes from 'prop-types'
import Field from './Field'
// import { validLicenceDate } from 'services'

class LicenceDate extends React.Component {
  validateLicenceDate = (e) => {
    // this.props.setError(validLicenceDate(e.target.value))
    this.props.blur()
  }

  dateChange = (value) => {
    let e = { target: { value } }
    this.props.change(e)
  }

  render() {
    const { name, value, error, focus } = this.props
    return (
      <React.Fragment>
        <input
          name={name}
          value={value}
          onChange={(e) => this.dateChange(e.target.value)}
          onFocus={focus}
          onBlur={this.validateLicenceDate}
          type="text"
        />
        {error && <div className="field-error">{error}</div>}
      </React.Fragment>
    )
  }
}

LicenceDate.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  change: PropTypes.func.isRequired,
}

export default Field(LicenceDate)
