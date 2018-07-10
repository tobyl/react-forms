import React from 'react'
import consts from 'translations'
import { requesterName } from 'helpers'

const getValue = (value, label) => {
  if (typeof value === 'boolean') {
    if (value) {
      return '✔︎'
    } else {
      return '✘'
    }
  } else if (label === 'Requester Name') {
    let requester = requesterName.filter(r => r[0] === value)[0]
    if (requester) {
      return requester[1]
    }
  } else {
    return value.toString()
  }
}

const DataItem = ({ label, value, error }) => {
  label = consts[label] || label
  return (
    <li>
      <h4>{label}</h4>
      <p>{getValue(value, label)}</p>
      {error && <p className="data-error">{error}</p>}
    </li>
  )
}

export default DataItem
