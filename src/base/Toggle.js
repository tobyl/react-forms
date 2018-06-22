import React from 'react'
import PropTypes from 'prop-types'
import Field from './Field'

import './custom-inputs.css'

class Toggle extends React.Component {

  toggleChange = (e) => {
    this.props.change(e)
  }

  render() {
    const { name, toggleLabel, value, focus, blur } = this.props
    return (
      <label className={value ? 'ToggleLabel checked' : 'ToggleLabel'} htmlFor={name}>
        <input
          id={name}
          name={name}
          value={value}
          checked={value}
          onChange={this.toggleChange}
          onFocus={focus}
          onBlur={blur}
          type="checkbox"
        /> <span>{toggleLabel}</span>
      </label>
    )
  }
}

Toggle.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool,
  ]),
  change: PropTypes.func.isRequired,
}

export default Field(Toggle)
