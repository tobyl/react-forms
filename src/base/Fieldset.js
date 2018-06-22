import React from 'react'
import { Route } from 'react-router-dom'
import { formContext } from './Form'
import { labelToSlug } from 'services'

const Fieldset = (Component) => {
  class WrappedFieldset extends React.Component {

    renderFieldset = (matchProps) => {
      let fsName = this.props.fieldsetName || Component.name
      this.props.setRoute(labelToSlug(fsName))
      if (matchProps.match.params.formStep === labelToSlug(fsName)) {
        return (
          <Component {...this.props} prefix={this.props.prefix} />
        )
      } else {
        return null
      }
    }

    render() {
      return (
        <div className="Fieldset">
          <Route render={(matchProps) => this.renderFieldset(matchProps)} />
        </div>
      )
    }
  }

  return React.forwardRef((props, ref) => (
    <formContext.Consumer>
      {state => <WrappedFieldset {...props} {...state} ref={ref} />}
    </formContext.Consumer>
  ))
}

export default Fieldset
