import React from 'react'
import Fieldset from 'base/Fieldset'
import LicenceDate from 'base/LicenceDate'
import Select from 'base/Select'
import LicenceGroup from './validateLicensing'

class LicenceDates extends React.Component {
  state = {
    dob: '1977-08-07',
    province: 'ON',
    oop: false,
    t3: false,
    t2: false,
    t1: false,
  }

  componentDidMount() {
    const licence = this.props.getValue('licence_class')
    this.datesChange(licence)
  }

  datesChange = () => {
    let { dob, province, oop } = this.state
    let licence = this.props.getValue('licence_class')
    let t3 = this.props.getValue('t3_date')
    let t2 = this.props.getValue('t2_date')
    let t1 = this.props.getValue('t1_date')

    let g = new LicenceGroup(dob, province, oop, licence, t3, t2, t1)

    //  visible: {
    //    t3: boolean,
    //    t2: boolean,
    //    t1: boolean,
    //  }

    //  destroy: ['t3', 't1'] or 't3'

    //  this.props.setErrors({
    //    t3_date: 'some error',
    //    t2_date: '',
    //    t1_date: 'some error',
    //  })


    // console.log('visible: ', g.visibleFields())
    // console.log('to destroy: ', g.toDestroy())
    // console.log('errors: ', g.fieldErrors())

    this.setState({
      ...this.state,
      t3: g.visible().t3,
      t2: g.visible().t2,
      t1: g.visible().t1,
    }, () =>
      this.props.destroy(g.toDestroy()),
      this.props.setErrors(g.fieldErrors())
    )
  }

  render() {
    const { t1, t2, t3 } = this.state
    return (
      <fieldset>
        <p>
          <small>dob: {this.state.dob}</small><br />
          <small>province: {this.state.province}</small><br />
          <small>out of province: {this.state.oop}</small>
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
