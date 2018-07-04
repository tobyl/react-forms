import React from 'react'
import moment from 'moment'
import Fieldset from 'base/Fieldset'
import LicenceDateButton from 'base/LicenceDateButton'
import Date from 'base/Date'
import { Spinner } from 'Components/Spinner'
import Modal from 'Components/Modal'
import Toggle from 'base/Toggle'
import { calculateDates } from './calculateDates'

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
      dates: [],
    }
  }

  componentDidMount() {
    setTimeout(() => {
      this.fetchDates()
    }, 1100)
  }

  fetchDates = (t1 = null, t2 = null, t3 = null) => {

    let training = this.props.getValue('driver_training')
    let oop = this.props.getValue('out_of_province_history')

    let dates = calculateDates(this.state.dob, training, oop)

    this.setState({ dates }, () => {
      dates.t1 && this.props.update('t1_date', dates.t1.format('YYYY-MM-DD'))
      dates.t2 && this.props.update('t2_date', dates.t2.format('YYYY-MM-DD'))
      this.props.update('t3_date', dates.t3.format('YYYY-MM-DD'))
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
          />
        </Modal>
      </fieldset>
    )
  }
}

export default Fieldset(LicenceDates)
