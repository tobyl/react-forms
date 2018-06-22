import React from 'react'
import moment from 'moment'
import Fieldset from 'base/Fieldset'
import LicenceDate from 'base/LicenceDate'
import Select from 'base/Select'

class LicenceDates extends React.Component {
  state = {
    dob: moment('1977-08-07'),
    t3: false,
    t2: false,
    t1: false,
  }

  componentDidMount() {
    const licence = this.props.getValue('licence_class')
    this.datesChange(licence)
  }

  datesChange = (value) => {
    let fields = {}
    let toDestroy = []
    switch (value) {
      case 'g':
        fields = { t3: true, t2: false, t1: false }
        toDestroy = ['t2_date', 't1_date']
        break
      case 'g2':
        fields = { t3: false, t2: true, t1: true }
        toDestroy = ['t3_date']
        break
      case 'g1':
        fields = { t3: false, t2: false, t1: true }
        toDestroy = ['t3_date', 't2_date']
        break
      default:
        break
    }
    this.setState({ ...fields }, () =>
      this.props.destroy(toDestroy)
    )
  }

  render() {
    const { t1, t2, t3 } = this.state
    return (
      <fieldset>
        <p>
          <small>dob: {this.state.dob.format('YYYY-MM-DD')}</small>
        </p>
        <Select
          name="licence_class"
          label="Licence Class"
          changeCallback={this.datesChange}
          choices={[['g', 'G'], ['g2', 'G2'], ['g1', 'G1']]}
        />
        {t3 && <LicenceDate name="t3_date" label="T3 Date" />}
        {t2 && <LicenceDate name="t2_date" label="T2 Date" />}
        {t1 && <LicenceDate name="t1_date" label="T1 Date" />}
      </fieldset>
    )
  }
}

export default Fieldset(LicenceDates)
