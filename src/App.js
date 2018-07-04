import React from 'react'
import { Route, Link } from 'react-router-dom'
import VehicleAddForm from './VehicleAddForm'
import DriverAddForm from './DriverAddForm'

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <h3>Welcome to the app.</h3>
        <Route exact path="/" render={() =>
          <ul>
            <li><Link to="/vehicle-add/get-started">Vehicle Add</Link></li>
            <li><Link to="/driver-add/get-started">Driver Add</Link></li>
          </ul>
        }/>
        <Route path="/vehicle-add" render={(matchProps) =>
          <VehicleAddForm {...matchProps} />
        }/>
        <Route path="/driver-add" render={(matchProps) =>
          <DriverAddForm {...matchProps} />
        }/>
      </div>
    )
  }
}

export default App
