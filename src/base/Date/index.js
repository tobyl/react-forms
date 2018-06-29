import React from 'react'
import PropTypes from 'prop-types'
import DatePicker from './DatePicker'
import Field from '../Field'

import './style.css'

class Date extends React.Component {

  setDate = (value) => {
    let e = { target: { value: value.format('YYYY-MM-DD') } }
    this.props.change(e)
  }

  render() {
    const { error } = this.props
    return (
      <React.Fragment>
        <DatePicker setDate={this.setDate} />
        {error && <div className="field-error">{error}</div>}
      </React.Fragment>
    )
  }
}

Date.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  change: PropTypes.func.isRequired,
}

export default Field(Date)
