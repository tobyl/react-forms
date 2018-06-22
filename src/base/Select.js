import React from 'react'
import PropTypes from 'prop-types'
import Field from './Field'

class Select extends React.Component {

  render() {
    const { name, value, change, choices, error, focus, blur } = this.props
    return (
      <React.Fragment>
        <select
          name={name}
          value={value}
          onChange={change}
          onFocus={focus}
          onBlur={blur}
        >
          <option value="">Select…</option>
          {choices && choices.map(ch =>
            <option key={ch[0]} value={ch[0]}>
              {ch[1]}
            </option>
          )}
        </select>
        {error && <div className="field-error">{error}</div>}
      </React.Fragment>
    )
  }
}

Select.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  change: PropTypes.func.isRequired,
  choices: PropTypes.array.isRequired,
}

export default Field(Select)
