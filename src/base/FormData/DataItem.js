import React from 'react'

const DataItem = ({ label, value, error }) => {
  return (
    <li>
      <h4>{label}</h4>
      <p>{value.toString()}</p>
      {error && <p className="data-error">{error}</p>}
    </li>
  )
}

export default DataItem
