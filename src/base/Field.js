import React from 'react'
import classNames from 'classnames'
import { formContext } from './Form'

const Field = (Component) => {
  class WrappedField extends React.Component {

    state = {
      value: '',
      touched: false,
      active: false,
      error: '',
    }

    componentDidMount() {
      let existingValue = this.props.getValue(this.props.name)
      if (existingValue || typeof existingValue === 'boolean') {
        this.setState({ value: existingValue })
      } else {
        this.props.update(this.props.name, '')
      }
    }

    change = (e) => {
      let t = e.target
      let value = t.type === 'checkbox' ? t.checked : t.value
      this.setState({ value }, () => {
        this.props.update(this.props.name, value)
        if (this.props.changeCallback) {
          this.props.changeCallback(value)
        }
      })
    }

    focus = (e) => this.setState({ touched: true, active: true })

    blur = (e) => this.setState({ active: false })

    setError = (error) => this.setState({ error })

    getError = () => {
      if (this.props.errors[this.props.name]) {
        return this.props.errors[this.props.name]
      } else {
        return this.state.error
      }
    }

    render() {
      let classes = classNames('field', {
        'toggle': this.props.toggleLabel,
        'active': this.state.active,
      })
      return (
        <div className={classes}>
          {this.props.label && <label>{this.props.label}</label>}
          <Component
            change={this.change}
            value={this.state.value}
            focus={this.focus}
            blur={this.blur}
            setError={this.setError}
            error={this.getError()}
            {...this.props}
          />
        </div>
      )
    }
  }

  return React.forwardRef((props, ref) => (
    <formContext.Consumer>
      {state => <WrappedField {...props} {...state} ref={ref} />}
    </formContext.Consumer>
  ))
}

export default Field
