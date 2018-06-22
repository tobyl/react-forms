import React from 'react'
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
    const current = window.location.pathname.replace('/vehicle-add/', '')
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

  nextClick = () => {
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
          // proceed to next fieldset!
        }
      })
  }

  render() {
    return (
      <div>
        <Link
          className={this.getIndex() < 1 ? 'btn disabled' : 'btn'}
          to={this.getBack()}
        >back</Link>{' '}
        {this.getIndex() !== (this.props.routes.length - 1) &&
          <button
          className="btn next-btn"
          to={this.getNext()}
          onClick={this.nextClick}
        // >{this.state.submitting && <img src={Spinner} />}next</button>}{''}
        >{this.state.submitting && <Spinner />}next</button>}{''}
        {this.getIndex() === (this.props.routes.length - 1) && <button className="btn" type="submit">submit</button>}
      </div>
    )
  }
}

export default FormNav
