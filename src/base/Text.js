import React from 'react'
import PropTypes from 'prop-types'
import Field from './Field'

class Text extends React.Component {
  render() {
    const { name, value, change, error, focus, blur } = this.props
    return (
      <React.Fragment>
        <input
          name={name}
          value={value}
          onChange={change}
          onFocus={focus}
          onBlur={blur}
          type="text"
        />
        {error && <div className="field-error">{error}</div>}
      </React.Fragment>
    )
  }
}

Text.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  change: PropTypes.func.isRequired,
}

export default Field(Text)
