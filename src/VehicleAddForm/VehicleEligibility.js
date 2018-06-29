import React from 'react'
import Fieldset from 'base/Fieldset'
import Toggle from 'base/Toggle'
import Select from 'base/Select'
import Date from 'base/Date'
import Text from 'base/Text'

const policies = [
  ['0x000001', '0x000001'],
  ['0x000002', '0x000002'],
]

class VehicleEligibility extends React.Component {
  render() {
    return (
      <fieldset>
        <Toggle
          name="carry_passengers_for_compensation"
          toggleLabel="Will the vehicle be used to carry passengers for compensation (e.g. taxi, ride sharing services such as Uber or Lyft)?"
        />
        <Toggle
          name="carry_special_use"
          toggleLabel="Will there be any special use of the vehicle, such as carrying dangerous goods or explosives?"
        />
        <Toggle
          name="vehicle_modified"
          toggleLabel="Has the vehicle been modified or customized (after market/not factory installed; i.e. wheelchair lift, ground effects, sound system, etc.)?"
        />
        <Toggle
          name="existing_damage"
          toggleLabel="Is there any existing or unrepaired damage to the vehicle?"
        />
        <Toggle
          name="winter_tires"
          toggleLabel="Do you have winter tires for this vehicle?"
        />
      </fieldset>
    )
  }
}

export default Fieldset(VehicleEligibility)
