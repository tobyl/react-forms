import React from 'react'
import consts from 'translations'

const getValue = (value) => {
  if (typeof value === 'boolean') {
    if (value) {
      return '✔︎'
    } else {
      return '✘'
    }
  } else {
    return value.toString()
  }
}

const DataItem = ({ label, value }) => {
  label = consts[label] || label
  return (
    <li>
      <p>{label}: {getValue(value)}</p>
    </li>
  )
}

export default DataItem
