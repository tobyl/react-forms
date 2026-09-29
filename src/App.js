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
          <div>
            <ul>
              <li><Link to="/vehicle-add/get-started">Vehicle Add</Link></li>
              <li><Link to="/driver-add/get-started">Driver Add</Link></li>
            </ul>
            <div>
              <h2>What the what?</h2>
              <p>In 2016 I was tasked with building some complex forms in a React application. After some brief research I added React Form (the most popular 3rd party form module at the time) and got to work.</p>
              <p>Over time, this approach became increasingly painful. As React Form evolved, it tried to do more and more, often against what worked best for our app. Every new bug prompted an existential crisis over whether we should fork the library or wait for a fix. Eventually I decided to see what building my own form library might look like.</p>
              <p>This demo is the result. The app used create-react-app, so AI was kind enough to migrate it to Vite for me, the rest of the code is intact (you can view the source code on <a href="https://github.com/tobyl/react-forms">the repo</a>). The foundation is JavaScript classes and Higher Order Components, which was the new hotness before React introduced hooks. The starting requirements:</p>
              <ul>
                <li>Native multi-page forms.</li>
                <li>No repetition of logic across form field components.</li>
                <li>Fields and fieldsets "own" their own state.</li>
                <li>Validation can be added at the individual field level, the fieldset level or the outer form level.</li>
                <li>Field clean functions should be portable and reusable across fields.</li>
                <li>Fields should handle their own human-readable value.</li>
              </ul>
              <p>This PoC served as the foundation of the eventual migration away from any 3rd party dependency, and after it was updated to hooks the same code has been running in production for nearly 10 years.</p>
            </div>
          </div>
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
