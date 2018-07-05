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

    this.t1Date = null
    this.t2Date = null
    this.t3Date = null
  }

  t1 = () => {
    let dob = this.dob.clone()
    return dob.add(16, 'years')
  }

  t2 = () => {
    let t1 = this.t1().clone()
    return t1.add(8, 'months')
  }

  t3 = () => {
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
