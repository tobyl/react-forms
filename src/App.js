import React from 'react'
import { Route, Link } from 'react-router-dom'
import VehicleRemove from './VehicleRemove'

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <h3>Welcome to the app.</h3>
        <Route exact path="/" render={() =>
          <Link to="/vehicle-add/get-started">Vehicle Remove</Link>
        }/>
        <VehicleRemove />
      </div>
    )
  }
}

export default App
