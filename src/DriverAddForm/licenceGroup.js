import moment from 'moment'

export class licenceGroup {
  constructor(dob, training, oop, tierInProgress, firstRun, date = null) {
    this.dob = moment(dob)
    this.training = training
    this.oop = oop
    this.tierInProgress = tierInProgress
    this.firstRun = firstRun

    if (date) {
      this.date = this.calculateFromNewDate(date)
    }

    this.t1Date = moment()
    this.t2Date = moment()
    this.t3Date = moment()
  }

  calculateFromNewDate = (date) => {
    console.log('calculating from new date ', date, this.tierInProgress)
  }

  t1 = () => {
    return this.dob.clone().add(16, 'years')
  }

  t2 = () => {
    return this.t1().clone().add(8, 'months')
  }

  t3 = () => {
    return this.t2().clone().add(1, 'years')
  }

  allDates = () => {
    return {
      t1: this.t1(),
      t2: this.t2(),
      t3: this.t3(),
    }
  }
}
