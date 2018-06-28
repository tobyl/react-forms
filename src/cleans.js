export const mustBeNumber = (value) => {
  if (isNaN(value) || value === '') {
    return 'Must be a number'
  }
  return false
}

export const cannotBeZero = (value) => {
  if (value === '0') {
    return 'Value cannot be zero'
  }
  return false
}

export const lessThanEightChars = (value) => {
  if (value.length > 8) {
    return 'Must be less than 8 characters'
  }
  return false
}
