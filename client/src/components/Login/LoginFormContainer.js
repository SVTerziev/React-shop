import React, { PureComponent } from 'react'
import OktaAuth from '@okta/okta-auth-js'
import { withAuth } from '@okta/okta-react'

import LoginForm from './LoginForm'

class LoginFormContainer extends PureComponent {
  state = {
    loading: false,
    error: false,
    sessionToken: null,
    username: '',
    password: ''
  }

  oktaAuth = new OktaAuth({ url: this.props.baseUrl })

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit = e => {
    e.preventDefault()

    this.setState({ loading: true })
    this.oktaAuth
      .signIn({
        username: this.state.username,
        password: this.state.password
      })
      .then(res => {
        this.setState({ sessionToken: res.sessionToken })
      })
      .catch(() => {
        this.setState({
          error: true,
          loading: false
        })
      })
  }

  render () {
    const { sessionToken, error, loading } = this.state

    if (sessionToken) {
      this.props.auth.redirect({ sessionToken })
    }

    return (
      <LoginForm
        loading={loading}
        error={error}
        handleSubmit={this.handleSubmit}
        handleChange={this.handleChange}
      />
    )
  }
}

export default withAuth(LoginFormContainer)
