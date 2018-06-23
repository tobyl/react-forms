import React from 'react'
import Fieldset from 'base/Fieldset'
import LicenceDate from 'base/LicenceDate'
import Select from 'base/Select'
import { LicenceGroup } from './validateLicensing'

class LicenceDates extends React.Component {
  state = {
    dob: '1977-08-07',
    t3: false,
    t2: false,
    t1: false,
  }

  componentDidMount() {
    const licence = this.props.getValue('licence_class')
    this.datesChange(licence)
  }

  datesChange = (value) => {
    let t3 = this.props.getValue('t3_date')
    let t2 = this.props.getValue('t2_date')
    let t1 = this.props.getValue('t1_date')
    let g = new LicenceGroup(this.state.dob, value, t3, t2, t1)
    this.setState({
      ...this.state,
      ...g.visible(),
    })
    // this.props.destroy(g.toDestroy())
  }

  render() {
    const { t1, t2, t3 } = this.state
    return (
      <fieldset>
        <p>
          <small>dob: {this.state.dob}</small>
        </p>
        <Select
          name="licence_class"
          label="Licence Class"
          changeCallback={this.datesChange}
          choices={[['g', 'G'], ['g2', 'G2'], ['g1', 'G1']]}
        />
        {t3 &&
          <LicenceDate
            name="t3_date"
            label="T3 Date"
            changeCallback={this.datesChange}
          />}
        {t2 &&
          <LicenceDate
            name="t2_date"
            label="T2 Date"
            changeCallback={this.datesChange}
          />}
        {t1 &&
          <LicenceDate
            name="t1_date"
            label="T1 Date"
            changeCallback={this.datesChange}
          />}
      </fieldset>
    )
  }
}

export default Fieldset(LicenceDates)
