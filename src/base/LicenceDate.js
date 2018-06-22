import React from 'react'
import moment from 'moment'
import PropTypes from 'prop-types'
import Field from './Field'

class LicenceDate extends React.Component {
  state = {
    date: moment()
  }

  dateChange = (value) => {
    let e = { target: { value } }
    this.props.change(e)
  }

  render() {
    const { name, value, error, focus, blur } = this.props
    return (
      <React.Fragment>
        <input
          name={name}
          value={value}
          onChange={(e) => this.dateChange(e.target.value)}
          onFocus={focus}
          onBlur={blur}
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
