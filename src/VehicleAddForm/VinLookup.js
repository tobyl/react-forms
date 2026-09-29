import React from 'react'
import { Spinner } from 'Components/Spinner'
import Fieldset from 'base/Fieldset'
import Text from 'base/Text'
import { validVin, isValidVin } from 'services'

class VinLookup extends React.Component {
  state = {
    fetching: false,
    year: '',
    make: '',
    model: '',
  }

  fetchVin = () => {
    let vin = this.props.getValue('vin_lookup')
    if (isValidVin(vin)) {
      this.setState({ fetching: true })
      fetch('/api/vehicle.json')
        .then(response => response.json())
        .then(response => new Promise(resolve =>
          setTimeout(() => resolve(response), 2000))
        )
        .then(res => {
          this.setState({
            year: res.vehicle_year,
            make: res.vehicle_make,
            model: res.vehicle_model,
          })
        })
        .then(() => this.setState({ fetching: false }))
    }
  }

  render() {
    const { year, make, model, fetching } = this.state
    return (
      <fieldset>
        <Text
          name="vin_lookup"
          label="Vehicle VIN Number"
          changeCallback={this.fetchVin}
          cleans={[validVin]}
        />
        {fetching && <Spinner />}
        {year && (
          <div style={{ marginBottom: '1rem' }}>
            We found the following vehicle:
            <h3>{`${year} ${make} ${model}`}</h3>
            If this is incorrect, please contact us.
          </div>
        )}
        <small style={{ position: 'relative', 'top': '5rem', color: '#999' }}>
          sample VIN: 3GCPCTE09BG224253
        </small>
      </fieldset>
    )
  }
}

VinLookup.displayName = 'VinLookup'
export default Fieldset(VinLookup, 'VinLookup')
