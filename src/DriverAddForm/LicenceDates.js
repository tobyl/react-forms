import React from 'react'
import moment from 'moment'
import Fieldset from 'base/Fieldset'
import LicenceDateButton from 'base/LicenceDateButton'
import Date from 'base/Date'
import { Spinner } from 'Components/Spinner'
import Modal from 'Components/Modal'
import Toggle from 'base/Toggle'
import { calculateDates, extractDobFromLicence } from './calculateDates'

class LicenceDates extends React.Component {
  constructor(props) {
    super(props)
    let dob = moment('1977-08-07')
    this.state = {
      dob: dob.clone(),
      province: 'ON',
      oop: false,
      tierInProgress: '',
      modalActive: false,
      dates: {},
    }
  }

  componentDidMount() {
    setTimeout(() => {
      this.fetchDates()
    }, 1100)
  }

  fetchDates = (tier = null, date = null) => {

    console.log('tier: ', tier, date)

    const { update, destroy } = this.props
    let licence = this.props.getValue('drivers_licence_number')

    if (licence) {
      let training = this.props.getValue('driver_training')
      let oop = this.props.getValue('out_of_province_history')
      let dob = extractDobFromLicence(licence)

      let dates = calculateDates(moment(dob), training, oop)

      this.setState({ dates }, () => {
        dates.t1 ? update('t1_date', dates.t1.format('YYYY-MM-DD')) : destroy('t1_date')
        dates.t2 ? update('t2_date', dates.t2.format('YYYY-MM-DD')) : destroy('t2_date')
        dates.t3 ? update('t3_date', dates.t3.format('YYYY-MM-DD')) : destroy('t3_date')
      })
    }

  }

  licenceClick = (tier) => {
    this.setState({
      modalActive: !this.state.modalActive,
      tierInProgress: tier,
    })
  }

  renderDates = () => {
    if (Object.keys(this.state.dates).length > 0) {
      return (
        <div className="YearsContainer">
          {Object.keys(this.state.dates).map((tier, i) =>
            <LicenceDateButton
              name={`${tier}_date`}
              key={this.state.dates[tier].format('YYYY-MM-DD')}
              date={this.state.dates[tier]}
              licenceClass={tier}
              licenceClick={this.licenceClick}
              changeCallback={() => this.fetchDates(tier, this.state.dates[tier])}
            />
          )}
        </div>
      )
    } else {
      return <Spinner />
    }
  }

  render() {
    return (
      <fieldset className="LicenceDates">
        <Toggle
          name="driver_training"
          toggleLabel="Do you have a driver training certificate?"
        />
        {this.renderDates()}
        <Modal show={this.state.modalActive} toggle={this.licenceClick}>
          <h4>Please set your {this.state.tierInProgress} licence</h4>
          <Date
            name={`${this.state.tierInProgress}_date`}
            maxDate={moment().startOf('day')}
            changeCallback={() => this.fetchDates(this.state.tierInProgress, this.state.dates[this.state.tierInProgress])}
          />
        </Modal>
      </fieldset>
    )
  }
}

export default Fieldset(LicenceDates)
