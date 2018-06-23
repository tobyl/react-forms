import moment from 'moment'

export class LicenceGroup {
  constructor(dob, licence, t3, t2, t1) {
    this.dob = moment(dob).startOf('day')
    this.licence = licence
    this.t3 = moment(t3, 'YYYY-MM-DD', true).startOf('day')
    this.t2 = moment(t2, 'YYYY-MM-DD', true).startOf('day')
    this.t1 = moment(t1, 'YYYY-MM-DD', true).startOf('day')

    this.gdlDate = moment('1994-04-01').startOf('day')
  }

  t3valid() {
    return this.t3.isValid()
  }

  t2valid() {
    return this.t3.isValid()
  }

  t1valid() {
    return this.t3.isValid()
  }

  visible = () => {
    let fields = { t3: false, t2: false, t1: false }

    if (this.licence) {
      if (this.t3 && this.t3valid()) {
        if (this.t3.isAfter(this.gdlDate)) {
          fields = { t3: true, t2: true, t1: true }
        } else {
          fields = { t3: true, t2: false, t1: false }
        }
      } else {
        fields = { t3: true, t2: false, t1: false }
      }
    }

    return fields
  }

  toDestroy = () => {
    let visible = this.visible()
    let keys = Object.keys(visible)
    return keys.map(k => visible[k])
  }

  isGdl = () => {
    if (this.t3.isValid()) {
      if (this.t3.isAfter(this.gdlDate)) {
        return true
      }
    }
    return false
  }
}

const validateLicensing = (dob, t3, t2, t1) => {
  console.log('got: ', dob, t3, t2, t1)
  if (moment(t3, 'YYYY-MM-DD', true).isValid()) {
    console.log('valid t3')
  } else if (moment(t2, 'YYYY-MM-DD', true).isValid()) {
    console.log('valid t2')
  } else if (moment(t1, 'YYYY-MM-DD', true).isValid()) {
    console.log('valid t1')
  }
}

export default validateLicensing
