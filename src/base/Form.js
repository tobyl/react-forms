import React from 'react'
import { Route } from 'react-router-dom'
import FormNav from './FormNav'
import FormData from './FormData'

import './forms.css'

export const formContext = React.createContext()

const initialData = {
  vehicle_driver: '02',
  '0x0001': false,
  '0x0002': true,
  requester_name: '01',
  effective_date: '2018-07-01',
}

const Form = (Component) => {
  return class WrappedForm extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        formData: initialData,
        errors: {},
      }
      this.routes = []
    }

    update = (field, value) => {
      this.setState({
        formData: {
          ...this.state.formData,
          [field]: value,
        }
      }, () => this.clearError(field))
    }

    destroy = (field) => {
      let nextState = Object.assign(this.state.formData, {})
      if (field.constructor === Array) {
        field.forEach(f =>
          delete nextState[f]
        )
      } else if (typeof field === 'string') {
        delete nextState[field]
      }
      this.setState({
        formData: nextState,
      })
    }

    get = (field) => {
      // console.log('get ', field)
      return this.state.formData[field]
    }

    setRoute = (route) => {
      if (this.routes.indexOf(route) === -1) {
        this.routes.push(route)
      }
    }

    setErrors = (errors) => {
      this.setState({ errors })
    }

    clearError = (field) => {
      let nextErrors = Object.assign(this.state.errors, {})
      delete nextErrors[field]
      this.setState({ errors: nextErrors })
    }

    render() {
      return (
        <formContext.Provider value={{
          formData: this.state.formData,
          update: this.update,
          setRoute: this.setRoute,
          getValue: this.get,
          destroy: this.destroy,
          errors: this.state.errors,
        }}>
          <Route path="/vehicle-add/:formStep" render={(matchProps) =>
            <Component
              formData={this.state.formData}
              setRoute={this.setRoute}
              {...matchProps}
            />
          }/>
          <Route render={(matchProps) =>
            <FormNav
              {...matchProps}
              routes={this.routes}
              setErrors={this.setErrors}
            />}
          />
          <FormData
            formData={this.state.formData}
            errors={this.state.errors}
          />
        </formContext.Provider>
      )
    }
  }
}

export default Form
