import React, { Component } from 'react'
import Redirect from 'react-router-dom/Redirect'
import { withAuth } from '@okta/okta-react'

import LoginFormContainer from './LoginFormContainer'

class Login extends Component {
  state = {
    authenticated: null
  }

  constructor (props) {
    super(props)

    this.checkAuth()
  }

  checkAuth = async () => {
    const authenticated = await this.props.auth.isAuthenticated()

    if (authenticated !== this.state.authenticated) {
      this.setState({ authenticated })
    }
  }

  componentDidUpdate () {
    this.checkAuth()
  }

  render () {
    const { authenticated } = this.state
    if (authenticated === null) return null

    return authenticated ? <Redirect to='/' /> : <LoginFormContainer baseUrl={this.props.baseUrl} />
  }
}

export default withAuth(Login)
