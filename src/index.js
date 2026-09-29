import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom'
import App from './App'

import './index.css'
import './buttons.css'

const container = document.getElementById('root')
const root = ReactDOM.createRoot(container)

root.render(
  <Router>
    <App />
  </Router>
)

// Clean up any legacy Create React App service worker
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.getRegistrations().then((registrations) => {
    for (const registration of registrations) {
      registration.unregister()
    }
  })
}

