import moment from 'moment'

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
