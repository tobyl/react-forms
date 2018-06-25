import moment from 'moment'
import { validDate, afterToday } from 'dateServices'

class WithGdl {
  constructor(dob, province, oop, licence, t3, t2, t1) {
    this.dob = dob
    this.province = province
    this.oop = oop
    this.licence = licence
    this.errors = {
      t3: '',
      t2: '',
      t1: '',
    }
  }
}

class LicenceGroup {
  constructor(dob, province, oop, licence, t3, t2, t1) {

    // setup
    this.dob = moment(dob).startOf('day')
    this.province = province
    this.oop = oop
    this.licence = licence

    // fixed gdl date
    this.gdlDate = moment('1994-04-01').startOf('day')

    this.t3 = validDate(t3)
    this.t2 = validDate(t2)
    this.t1 = validDate(t1)

    this.group = new WithGdl(dob, province, oop, licence, this.t3, this.t2, this.t1)
  }

  t3Visible = () => {
    if (this.licence === 'g') {
      return true
    }
    return false
  }

  t2Visible = () => {
    if (this.licence === 'g2') {
      return true
    } else if (this.t3 && this.t3.isAfter(this.gdlDate)) {
      return true
    }
    return false
  }

  t1Visible = () => {
    if (this.licence === 'g1' || this.licence === 'g2') {
      return true
    } else if (this.t3 && this.t3.isAfter(this.gdlDate)) {
      return true
    }
    return false
  }

  visible = () => {
    return {
      t3: this.t3Visible(),
      t2: this.t2Visible(),
      t1: this.t1Visible(),
    }
  }

  toDestroy = () => {
    let fields = []

    if (!this.t3Visible()) {
      fields.push('t3_date')
    }

    if (!this.t2Visible()) {
      fields.push('t2_date')
    }

    if (!this.t1Visible()) {
      fields.push('t1_date')
    }

    return fields
  }

  fieldErrors = () => {
    return {
      t3: '',
      t2: '',
      t1: '',
    }
  }
}

export default LicenceGroup
