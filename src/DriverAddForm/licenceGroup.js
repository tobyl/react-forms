import { addYears, addMonths } from 'date-fns'

export class licenceGroup {
  constructor(dob, training, oop, tierInProgress, date = null) {
    this.dob = new Date(dob)
    this.training = training
    this.oop = oop

    this.tierInProgress = tierInProgress
    this.date = date ? new Date(date) : null

    this.t1Date = null
    this.t2Date = null
    this.t3Date = null
  }

  t1 = () => {
    if (this.tierInProgress === 't1') {
      return this.date
    }
    return addYears(this.dob, 16)
  }

  t2 = () => {
    if (this.tierInProgress === 't2') {
      return this.date
    }
    return addMonths(this.t1(), 8)
  }

  t3 = () => {
    if (this.tierInProgress === 't3') {
      return this.date
    }
    return addYears(this.t2(), 1)
  }

  allDates = () => {
    return {
      t1: this.t1(),
      t2: this.t2(),
      t3: this.t3(),
    }
  }
}
