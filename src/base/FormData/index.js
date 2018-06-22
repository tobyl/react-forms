import React from 'react'
import DataItem from './DataItem'

import './style.css'

const FormData = ({ formData, errors }) => {
  return (
    <div className="FormData">
      <ul>
        {Object.keys(formData).map(x =>
          <DataItem
            key={x}
            label={x}
            value={formData[x]}
            error={errors[x]}
          />
        )}
      </ul>
    </div>
  )
}

export default FormData
