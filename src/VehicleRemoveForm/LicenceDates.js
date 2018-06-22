import React from 'react'
import Fieldset from 'base/Fieldset'
import Text from 'base/Text'
import Select from 'base/Select'

class LicenceDates extends React.Component {
  state = {
    t3: false,
    t2: false,
    t1: false,
  }

  componentDidMount() {
    const licence = this.props.getValue('licence_class')
    this.datesChange(licence)
  }

  datesChange = (value) => {
    if (value === 'g') {
      this.setState({ t3: true, t2: false, t1: false }, () => {
        this.props.destroy(['t2_date', 't1_date'])
      })
    } else if (value === 'g2') {
      this.setState({ t3: false, t2: true, t1: true }, () =>
        this.props.destroy('t3_date')
      )
    } else if (value === 'g1') {
      this.setState({ t3: false, t2: false, t1: true }, () => {
        this.props.destroy(['t3_date', 't2_date'])
      })
    } else {
      this.props.destroy(['t3_date', 't2_date', 't1_date'])
    }
  }

  render() {
    const { t1, t2, t3 } = this.state
    return (
      <fieldset>
        <Select
          name="licence_class"
          label="Licence Class"
          changeCallback={this.datesChange}
          choices={[['g', 'G'], ['g2', 'G2'], ['g1', 'G1']]}
        />
        {t3 && <Text name="t3_date" label="T3 Date" />}
        {t2 && <Text name="t2_date" label="T2 Date" />}
        {t1 && <Text name="t1_date" label="T1 Date" />}
      </fieldset>
    )
  }
}

export default Fieldset(LicenceDates)
