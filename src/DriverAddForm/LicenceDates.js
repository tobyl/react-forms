import React from 'react'
import moment from 'moment'
import Fieldset from 'base/Fieldset'
import LicenceDateButton from 'base/LicenceDateButton'
import NewDate from 'base/NewDate'
import { Spinner } from 'Components/Spinner'
import Modal from 'Components/Modal'
import Toggle from 'base/Toggle'
import { extractDobFromLicence } from './calculateDates'
import { licenceGroup } from './licenceGroup'

class LicenceDates extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
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

  getDob = () => {
    let licence = this.props.getValue('drivers_licence_number')
    return moment(extractDobFromLicence(licence))
  }

  fetchDates = (date = null) => {


    let group = new licenceGroup(
      this.getDob(), // dob
      this.props.getValue('driver_training'), // driver training
      this.props.getValue('out_of_province_history'), // oop
      this.state.tierInProgress, // tierInProgress
      date, // date just set
    )

    this.setState({ dates: group.allDates() }, () => {
      group.t1() && this.props.update('t1_date', group.t1().format('YYYY-MM-DD'))
      group.t2() && this.props.update('t2_date', group.t2().format('YYYY-MM-DD'))
      group.t3() && this.props.update('t3_date', group.t3().format('YYYY-MM-DD'))
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
          changeCallback={this.fetchDates}
        />
        {this.renderDates()}
        <Modal show={modalActive} toggle={this.licenceClick}>
          <h4>Please set your {tierInProgress} licence</h4>
          <NewDate
            name={`${tierInProgress}_date`}
            minDate={this.getDob().clone().add(16, 'years')}
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
