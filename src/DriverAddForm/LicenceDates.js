import React from 'react'
import moment from 'moment'
import Fieldset from 'base/Fieldset'
import LicenceDateButton from 'base/LicenceDateButton'
import NewDate from 'base/NewDate'
import { Spinner } from 'Components/Spinner'
import Modal from 'Components/Modal'
import Toggle from 'base/Toggle'
import { calculateDates, extractDobFromLicence } from './calculateDates'

class LicenceDates extends React.Component {
  constructor(props) {
    super(props)
    let dob = moment('1977-08-07')
    this.state = {
      dob: dob,
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

  fetchDates = (date = null) => {

    let training = this.props.getValue('driver_training')
    let oop = this.props.getValue('out_of_province_history')

    let dates = {}

    if (Object.keys(this.state.dates).length < 1) {
      dates = calculateDates(this.state.dob, training, oop)
    } else {
      dates = calculateDates(this.state.dob, training, oop, this.state.tierInProgress, date)
    }

    console.log('got back: ', dates)

    this.setState({ dates }, () => {
      dates.t1 && this.props.update('t1_date', dates.t1.format('YYYY-MM-DD'))
      dates.t2 && this.props.update('t2_date', dates.t2.format('YYYY-MM-DD'))
      dates.t3 && this.props.update('t3_date', dates.t3.format('YYYY-MM-DD'))
    })

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
              changeCallback={this.fetchDates}
            />
          )}
        </div>
      )
    } else {
      return <Spinner />
    }
  }

  render() {
    const { modalActive, tierInProgress, dates } = this.state
    return (
      <fieldset className="LicenceDates">
        <Toggle
          name="driver_training"
          toggleLabel="Do you have a driver training certificate?"
        />
        {this.renderDates()}
        <Modal show={modalActive} toggle={this.licenceClick}>
          <h4>Please set your {tierInProgress} licence</h4>
          <NewDate
            name={`${tierInProgress}_date`}
            minDate={this.state.dob.clone().add(16, 'years')}
            maxDate={moment().startOf('day')}
            showYear={true}
            displayDate={dates[tierInProgress]}
            changeCallback={this.fetchDates}
          />
        </Modal>
      </fieldset>
    )
  }
}

export default Fieldset(LicenceDates)
