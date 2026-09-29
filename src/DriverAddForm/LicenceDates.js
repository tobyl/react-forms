import React from 'react'
import { format, addYears } from 'date-fns'
import Fieldset from 'base/Fieldset'
import LicenceDateButton from 'base/LicenceDateButton'
import NewDate from 'base/NewDate'
import { Spinner } from 'Components/Spinner'
import Modal from 'Components/Modal'
import Toggle from 'base/Toggle'
import { extractDobFromLicence, getYearsArray } from './licenceServices'
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
    return new Date(extractDobFromLicence(licence))
  }

  fetchDates = (date = null) => {
    const { getValue, update } = this.props

    let group = new licenceGroup(
      this.getDob(), // dob
      getValue('driver_training'), // driver training
      getValue('out_of_province_history'), // oop
      this.state.tierInProgress, // tierInProgress
      date, // date just set
    )

    this.setState({ dates: group.allDates() }, () => {
      group.t1() && update('t1_date', format(group.t1(), 'YYYY-MM-DD'))
      group.t2() && update('t2_date', format(group.t2(), 'YYYY-MM-DD'))
      group.t3() && update('t3_date', format(group.t3(), 'YYYY-MM-DD'))
    })

  }

  licenceClick = (tier) => {
    this.setState({
      modalActive: !this.state.modalActive,
      tierInProgress: tier,
    })
  }

  renderDates = () => {
    let { dates } = this.state
    if (Object.keys(dates).length > 0) {

      let yearArray = getYearsArray(dates)

      return (
        <div className="YearsContainer">
          {yearArray.map((yr, i) => {
            let props
            if (yr === Number(format(dates.t1, 'YYYY'))) {
              props = {
                name: "t1_date", date: dates.t1, licenceClass: "t1"
              }
            } else if (yr === Number(format(dates.t2, 'YYYY'))) {
              props = {
                name: "t2_date", date: dates.t2, licenceClass: "t2"
              }
            } else if (yr === Number(format(dates.t3, 'YYYY'))) {
              props = {
                name: "t3_date", date: dates.t3, licenceClass: "t3"
              }
            } else {
              props = {
                yearOnly: yr,
              }
            }
            return (
              <LicenceDateButton
                key={yr}
                {...props}
                licenceClick={this.licenceClick}
                changeCallback={this.fetchDates}
              />
            )
          })}
        </div>
      )
    } else {
      return <Spinner />
    }
  }

  render() {
    let today = new Date()
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
            minDate={addYears(this.getDob(), 16)}
            maxDate={today}
            showYear={true}
            displayDate={dates[tierInProgress]}
            selectedDate={dates[tierInProgress]}
            changeCallback={this.fetchDates}
          />
        </Modal>
      </fieldset>
    )
  }
}

LicenceDates.displayName = 'LicenceDates'
export default Fieldset(LicenceDates, 'LicenceDates')
