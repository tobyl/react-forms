import React from 'react'
import { Route, Link } from 'react-router-dom'
import VehicleAddForm from './VehicleAddForm'

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <h3>Welcome to the app.</h3>
        <Route exact path="/" render={() =>
          <Link to="/vehicle-add/get-started">Vehicle Add</Link>
        }/>
        <VehicleAddForm />
      </div>
    )
  }
}

export default App
