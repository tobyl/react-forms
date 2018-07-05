import moment from 'moment'

export class licenceGroup {
  constructor(dob, training, oop, tierInProgress, date = null) {
    this.dob = moment(dob)
    this.training = training
    this.oop = oop

    this.tierInProgress = tierInProgress
    this.date = date ? moment(date) : null

    this.t1Date = null
    this.t2Date = null
    this.t3Date = null
  }

  t1 = () => {
    if (this.tierInProgress === 't1') {
      return this.date
    }
    let dob = this.dob.clone()
    return dob.add(16, 'years')
  }

  t2 = () => {
    if (this.tierInProgress === 't2') {
      return this.date
    }
    let t1 = this.t1().clone()
    return t1.add(8, 'months')
  }

  t3 = () => {
    if (this.tierInProgress === 't3') {
      return this.date
    }
    let t2 = this.t2().clone()
    return t2.add(1, 'years')
  }

  allDates = () => {
    return {
      t1: this.t1(),
      t2: this.t2(),
      t3: this.t3(),
    }
  }
}
