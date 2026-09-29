import React from 'react'
import PropTypes from 'prop-types'
import Field from './Field'
import { SelectChevron } from 'icons'

class Select extends React.Component {

  getError = () => {
    if (this.props.error) {
      return this.props.error
    } else if (this.props.value === '-1') {
      return 'Please make a valid selection'
    }
    return ''
  }

  render() {
    const { name, value, change, choices, focus, blur } = this.props
    return (
      <div style={{ position: 'relative' }}>
        <select
          name={name}
          value={value}
          onChange={change}
          onFocus={focus}
          onBlur={blur}
        >
          <option value="-1">Select…</option>
          {choices && choices.map(ch =>
            <option key={ch[0]} value={ch[0]}>
              {ch[1]}
            </option>
          )}
        </select>
        {this.getError() && <div className="field-error">{this.getError()}</div>}
        <SelectChevron />
      </div>
    )
  }
}

Select.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  change: PropTypes.func.isRequired,
  choices: PropTypes.array.isRequired,
}

Select.displayName = 'Select'
export default Field(Select, 'Select')
