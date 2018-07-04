import React from 'react'
import classNames from 'classnames'
import { Link } from 'react-router-dom'
import { Spinner } from 'Components/Spinner'

class FormNav extends React.Component {
  state = {
    submitting: false,
    nextDisabled: false,
    backDisabled: true,
  }

  getIndex = () => {
    const { routes } = this.props
    let path = this.props.match.path
    const current = window.location.pathname.replace(`${path}/`, '')
    return routes.indexOf(current)
  }

  getNext = () => {
    if (this.getIndex() === -1 || this.getIndex() === this.props.routes.length - 1) {
      return '/'
    }
    return this.props.routes[this.getIndex() + 1]
  }

  getBack = () => {
    if (this.getIndex() === -1 || this.getIndex() === 0) {
      return '/'
    }
    return this.props.routes[this.getIndex() - 1]
  }

  nextClick = (e) => {
    e.preventDefault()
    this.setState({ submitting: true })
    fetch('http://localhost:3001/errors')
      .then(response => response.json())
      .then(response => new Promise(resolve =>
        setTimeout(() => resolve(response), 2000))
      )
      .then(response => {
        if (Object.keys(response).length > 0) {
          this.setState({ submitting: false }, () =>
            this.props.setErrors(response)
          )
        } else {
          this.props.history.push(this.getNext())
        }
      })
      .then(() => this.setState({ submitting: false }))
  }

  handleSubmit = (e) => {
    e.preventDefault()
  }

  nextDisabled = () => {
    if (this.props.errors) {
      let keys = Object.keys(this.props.errors)
      let errorVals = keys.filter(k =>
        this.props.errors[k] !== ''
      )
      return errorVals.length > 0
    }
    return true
  }

  render() {
    let next = classNames('btn next-btn', {
      'disabled': this.nextDisabled(),
    })
    return (
      <div>
        <Link
          className={this.getIndex() < 1 ? 'btn disabled' : 'btn'}
          to={this.getBack()}
        >back</Link>{' '}
        {this.getIndex() !== (this.props.routes.length - 1) &&
          <button
            className={next}
            disabled={this.nextDisabled()}
            to={this.getNext()}
            onClick={this.nextClick}
        >{this.state.submitting && <Spinner />}next</button>}{''}
        {this.getIndex() === (this.props.routes.length - 1) && <button className="btn" type="submit">submit</button>}
      </div>
    )
  }
}

export default FormNav
