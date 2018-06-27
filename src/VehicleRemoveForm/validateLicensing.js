import moment from 'moment'
import { validDate, afterToday } from 'dateServices'

class GdlGroup {
  constructor(dob, province, licence, t3, t2, t1) {
    this.dob = validDate(dob)
    this.province = province
    this.licence = licence
    this.errors = {
      t3: '',
      t2: '',
      t1: '',
    }
  }
}

class SingleLicence {
  constructor(dob, province, licence, oop, t3) {
    this.dob = validDate(dob)
    this.province = province
    this.licence = licence
    this.t3 = validDate(t3)
    this.t3Error = this.t3Error()
  }

  t3Error = () => {
    if (this.t3) {
      if (afterToday(this.t3)) {
        return 'Date cannot be after today'
      }
    }
    return ''
  }

}

class LicenceGroup {
  constructor(dob, province, licence, oop, t3, t2, t1) {

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

    this.group = new SingleLicence(dob, province, licence, oop, this.t3)

    if (this.t2 || this.t1) {
      this.group = new GdlGroup(dob, province, licence, oop, this.t3, this.t2, this.t1)
    }
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
    if (this.licence === '-1') {
      return { t3: false, t2: false, t1: false }
    }
    return {
      t3: this.t3Visible(),
      t2: this.t2Visible(),
      t1: this.t1Visible(),
    }
  }

  toDestroy = () => {

    if (this.licence === '-1') {
      return ['t3_date', 't2_date', 't1_date']
    }

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
      't3_date': this.group.t3Error,
      't2_date': '',
      't1_date': '',
    }
  }
}

export default LicenceGroup
