import React from 'react'
import PropTypes from 'prop-types'
import Field from './Field'

import './custom-inputs.css'

class Toggle extends React.Component {

  componentDidMount() {
    // set to false by default
    let e = {
      target: {
        checked: false,
        value: false,
      }
    }
    this.props.change(e)
  }

  toggleChange = (e) => {
    this.props.change(e)
  }

  render() {
    const { name, toggleLabel, value, error, focus, blur } = this.props
    return (
      <React.Fragment>
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
        {error && <div className="field-error">{error}</div>}
      </React.Fragment>
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
