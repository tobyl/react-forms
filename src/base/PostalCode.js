import React from 'react'
import PropTypes from 'prop-types'
import Field from './Field'
import { validPostalCode } from 'services'

class PostalCode extends React.Component {

  validatePostalCode = (e) => {
    this.props.setError(validPostalCode(e.target.value))
    this.props.blur()
  }

  render() {
    const { name, value, change, focus, error } = this.props
    return (
      <React.Fragment>
        <input
          name={name}
          value={value}
          onChange={change}
          onFocus={focus}
          onBlur={this.validatePostalCode}
          type="text"
        />
        {error && <div className="field-error">{error}</div>}
      </React.Fragment>
    )
  }
}

PostalCode.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  change: PropTypes.func.isRequired,
}

PostalCode.displayName = 'PostalCode'
export default Field(PostalCode, 'PostalCode')
