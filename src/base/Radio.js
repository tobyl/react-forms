import React from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import Field from './Field'

import './custom-inputs.css'

class Radio extends React.Component {
  state = { selected: null, focused: '' }

  radioChange = (value) => {
    this.setState({ selected: value }, () =>
      this.props.change({
        target: {
          value: value,
        }
      })
    )
  }

  radioFocus = (e) => {
    this.setState({
      focused: e.target.name,
    }, () => this.props.focus())
  }

  getClasses = (value, name) => {
    return classNames('RadioLabel', {
      'checked': this.state.selected === value,
      'focused': this.state.focused === name,
    })
  }

  render() {
    const { value, choices, blur } = this.props
    return (
      <div className="RadioGroup">
        {choices.map(ch =>
          <label
            className={this.getClasses(ch[0], ch[1])}
            htmlFor={ch[0]}
            key={ch[0]}
          >
            <input
              id={ch[0]}
              name={ch[1]}
              value={value}
              checked={this.state.selected === ch[0] || value === ch[0]}
              onChange={() => this.radioChange(ch[0])}
              onFocus={this.radioFocus}
              onBlur={blur}
              type="radio"
            /> <span>{ch[1]}</span>
          </label>
        )}
      </div>
    )
  }
}

Radio.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  change: PropTypes.func.isRequired,
  choices: PropTypes.array.isRequired,
}

export default Field(Radio)
