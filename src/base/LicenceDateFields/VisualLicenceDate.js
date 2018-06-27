import React from 'react'
import PropTypes from 'prop-types'
import Field from '../Field'
import VisualDateChooser from './VisualDateChooser'
import { Pencil } from 'icons'

class VisualLicenceDate extends React.Component {
  state = {
    pickerVisible: false,
  }

  getLicenceClass = (licenceClass) => {
    if (licenceClass === 't3') {
      return 'G'
    } else if (licenceClass === 't2') {
      return 'G2'
    } else {
      return 'G1'
    }
  }

  dateClick = () => {
    this.setState({ pickerVisible: !this.state.pickerVisible })
  }

  render() {
    const { name, value, change, error, focus, blur, date, momentDate, licenceClass, setDate } = this.props
    return (
      <React.Fragment>
        <div className={licenceClass ? 'VisualLicenceDate' : 'VisualLicenceDate NoLicence'}>
          <span>{date}</span>
          <button onClick={this.dateClick}>
            <span>{this.getLicenceClass(licenceClass)}</span>
            <strong>{momentDate && momentDate.format('MMMM Do YYYY')}</strong>
            <Pencil />
          </button>
          {this.state.pickerVisible &&
            <VisualDateChooser
              setDate={setDate}
              change={change}
              momentDate={momentDate}
            />}
        </div>
        {/* <input
          name={name}
          value={value}
          onChange={change}
          onFocus={focus}
          onBlur={blur}
          type="text"
        /> */}
        {error && <div className="field-error">{error}</div>}
      </React.Fragment>
    )
  }
}

VisualLicenceDate.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  change: PropTypes.func.isRequired,
}

export default Field(VisualLicenceDate)
