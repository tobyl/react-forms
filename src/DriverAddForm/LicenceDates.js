import React from 'react'
import moment from 'moment'
import Fieldset from 'base/Fieldset'
import LicenceDateButton from 'base/LicenceDateButton'
import Date from 'base/Date'
import Modal from 'Components/Modal'
import Toggle from 'base/Toggle'

class LicenceDates extends React.Component {
  constructor(props) {
    super(props)
    let dob = moment('2000-05-01')
    this.state = {
      dob: dob.clone(),
      province: 'ON',
      oop: false,
      tierInProgress: '',
      modalActive: false,
      dates: {
        t1: this.calculateT1(dob),
        t2: this.calculateT2(dob),
        t3: this.calculateT3(dob),
      }
    }
  }

  componentDidMount() {
    // const licence = this.props.getValue('licence_class')
    // this.datesChange(licence)
  }

  datesChange = () => {
    console.log('something changed...', this.state)
  }

  licenceClick = (tier) => {
    this.setState({
      modalActive: !this.state.modalActive,
      tierInProgress: tier,
    })
  }

  toggleWarning = () => this.setState({ warningPresent: !this.state.warningPresent })

  calculateT3 = (dob) => {
    return dob.clone().add(16, 'years').add(8, 'months').add(1, 'years')
  }

  calculateT2 = (dob) => {
    return dob.clone().add(16, 'years').add(8, 'months')
  }

  calculateT1 = (dob) => {
    return dob.clone().add(16, 'years')
  }

  getLicenceDate = (licenceYear) => {
    if (licenceYear === this.state.dates.t1.format('YYYY')) {
      return this.state.dates.t1
    } else if (licenceYear === this.state.dates.t2.format('YYYY')) {
      return this.state.dates.t2
    } else if (licenceYear === this.state.dates.t3.format('YYYY')) {
      return this.state.dates.t3
    }
  }

  getLicenceTier = (licenceYear) => {
    if (licenceYear === this.state.dates.t1.format('YYYY')) {
      return 't1'
    } else if (licenceYear === this.state.dates.t2.format('YYYY')) {
      return 't2'
    } else if (licenceYear === this.state.dates.t3.format('YYYY')) {
      return 't3'
    } else {
      return false
    }
  }

  setDate = (tier, date) => {
    this.setState({
      dates: {
        ...this.state.dates,
        [tier]: date,
      }
    }, () => console.log('set date: ', this.state.dates))
  }

  renderDates = () => {
    let first = this.state.dates.t1.clone().format('YYYY')
    let last = this.state.dates.t3.clone().format('YYYY')
    let start = Number(first)
    let end = Number(last)
    let years = []
    while (start < end + 2) {
      years.push(start.toString())
      start++
    }
    return (
      <div className="YearsContainer">
        {years.map(k =>
          <LicenceDateButton
            name={`${this.getLicenceTier(k)}_date`}
            key={k}
            date={k}
            momentDate={this.getLicenceDate(k)}
            licenceClass={this.getLicenceTier(k)}
            licenceClick={this.licenceClick}
          />
        )}
      </div>
    )
  }

  render() {
    return (
      <fieldset className="LicenceDates">
        <Toggle
          name="driver_training"
          toggleLabel="Do you have a driver training certificate?"
          changeCallback={this.datesChange}
        />
        {this.renderDates()}
        <Modal show={this.state.modalActive} toggle={this.licenceClick}>
          <h4>Please set your {this.state.tierInProgress} licence</h4>
          <Date
            name={`${this.state.tierInProgress}_date`}
            maxDate={moment().startOf('day')}
          />
        </Modal>
      </fieldset>
    )
  }
}

export default Fieldset(LicenceDates)
