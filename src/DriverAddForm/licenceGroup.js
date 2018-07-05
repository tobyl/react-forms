import moment from 'moment'

export class licenceGroup {
  constructor(dob, training, oop, tierInProgress, date = null) {
    this.dob = moment(dob)
    this.training = training
    this.oop = oop

    this.date = {
      tier: tierInProgress,
      setDate: date,
    }

    this.t1Date = moment()
    this.t2Date = moment()
    this.t3Date = moment()
  }

  calculateFromNewDate = (date) => {
    if (date) {
      if (this.t1Current()) {
        console.log('we are changing t1', date)
      }
      if (this.t2Current()) {
        console.log('we are changing t2')
      }
      if (this.t3Current()) {
        console.log('we are changing t3')
      }
    }
    return null
  }

  t1Current = () => this.date.tierInProgress === 't1'
  t2Current = () => this.date.tierInProgress === 't2'
  t3Current = () => this.date.tierInProgress === 't3'

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
