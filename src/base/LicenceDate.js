import React from 'react'
import PropTypes from 'prop-types'
import Field from './Field'

class LicenceDate extends React.Component {

  dateChange = (e) => {
    this.props.change(e)
  }

  render() {
    const { name, value } = this.props
    return (
      <input
        name={name}
        value={value}
        onChange={dateChange}
        type="date"
      />
    )
  }
}

LicenceDate.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  change: PropTypes.func.isRequired,
}

export default Field(LicenceDate)
