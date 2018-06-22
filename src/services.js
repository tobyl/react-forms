export const labelToSlug = (label) => {
  if (label && !label.includes('-')) {
    if (label.match(/[0-9]+/g)) {
      return label.toLowerCase()
    }
    label = label.match(/[A-Z][a-z]+/g)
    if (label && label.length > 0) {
      label = label.join('-')
      return label.toLowerCase()
    }
  }
  return label.toLowerCase()
}

export const slugToLabel = (slug) => {
  if (slug) {
    slug = slug.replace('/', '').split('-')
    let withUpper = slug.map(x => x.charAt(0).toUpperCase() + x.slice(1))
    let newString = withUpper.join('')
    return newString
  }
  return slug
}

export const validPostalCode = (value) => {
  const first =  'abceghjklmnprstvxy'
  const second = 'abceghjklmnprstvwxyz'
  const postalRegex = new RegExp(`^[${first}]\\d[${second}]( )?\\d[${second}]\\d$`, 'i')
  if (value.match(postalRegex)) {
    return ''
  }
  return 'Invalid postal code'
}

export const delay = ms => new Promise(resolve => setTimeout(resolve, ms))
