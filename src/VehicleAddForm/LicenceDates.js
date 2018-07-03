import React from 'react'
import moment from 'moment'
import Modal from 'Components/Modal'
import Fieldset from 'base/Fieldset'
import LicenceDateButton from 'base/LicenceDateButton'
import Toggle from 'base/Toggle'

class LicenceDates extends React.Component {
  constructor(props) {
    super(props)
    let dob = moment('2000-05-01')
    this.state = {
      dob: dob.clone(),
      province: 'ON',
      oop: false,
      modal: false,
      tierInProgress: '',
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

  toggleModal = (tier = '') => {
    this.setState({
      modal: !this.state.modal,
      tierInProgress: tier,
    })
  }

  datesChange = () => {
    console.log('something changed...')
  }

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
      <div className="YearContainer">
        {years.map(k =>
          <LicenceDateButton
            name={`${this.getLicenceTier(k)}_date`}
            key={k}
            date={k}
            momentDate={this.getLicenceDate(k)}
            licenceClass={this.getLicenceTier(k)}
            toggleModal={this.toggleModal}
            changeCallback={this.datesChange}
          />
        )}
      </div>
    )
  }

  render() {
    return (
      <fieldset className="DriverLicensing">
        <Toggle
          name="driver_training"
          toggleLabel="Do you have a driver training certificate?"
          changeCallback={this.datesChange}
        />
        <p className="fieldset-label">Here are the dates we believe should be accurate for your G1, G2 and G licences. If the dates are incorrect, please click each date to make a change.</p>
        {this.renderDates()}
        {this.state.modal &&
          <Modal
            toggleModal={this.toggleModal}
            tierInProgress={this.state.tierInProgress}
          />}
      </fieldset>
    )
  }
}

export default Fieldset(LicenceDates)
