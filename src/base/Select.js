import React from 'react'
import PropTypes from 'prop-types'
import Field from './Field'

class Select extends React.Component {

  render() {
    const { name, value, change, choices, error, focus, blur } = this.props
    return (
      <div style={{ position: 'relative' }}>
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
        <svg className="select-chevron" xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 444.819 444.819"><path d="M434.252 114.203l-21.41-21.416c-7.418-7.04-16.083-10.56-25.974-10.56-10.095 0-18.657 3.52-25.7 10.56L222.41 231.55 83.653 92.79c-7.042-7.04-15.606-10.56-25.697-10.56-9.896 0-18.56 3.52-25.98 10.56L10.85 114.208C3.614 121.437 0 130.1 0 140.187c0 10.278 3.62 18.843 10.848 25.694l185.864 185.866c6.855 7.23 15.416 10.848 25.697 10.848 10.087 0 18.75-3.617 25.976-10.848L434.25 165.88c7.044-7.043 10.568-15.607 10.568-25.692 0-9.9-3.523-18.56-10.566-25.985z" fill="#ccc"/></svg>
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

export default Field(Select)
