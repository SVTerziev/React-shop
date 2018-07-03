import React, { PureComponent } from 'react'
import PurchaseForm from './PurchaseForm'

class PurchaseFormContainer extends PureComponent {
  state = {
    loading: false,
    ordered: false,
    name: '',
    phone: '',
    email: '',
    city: '',
    address: '',
    comment: '',
    quantity: 1
  }

  handleSubmit = async e => {
    e.preventDefault()

    this.setState({ loading: true })
    const { loading, ordered, ...rest } = this.state
    const payload = {
      productUrl: window.location.pathname.split('/')[2],
      ...rest
    }
    const response = await fetch('http://localhost/order', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    })

    const { ordered: orderedResult } = await response.json()

    this.setState({
      ordered: orderedResult,
      loading: false
    })
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  render () {
    const { commentRequired } = this.props
    const { name, phone, city, address, quantity, comment } = this.state
    const formCompleted =
      name && phone && city && address && quantity && (commentRequired ? comment : true)

    return (
      <PurchaseForm
        commentRequired={commentRequired}
        formCompleted={formCompleted}
        handleChange={this.handleChange}
        handleSubmit={this.handleSubmit}
        {...this.state}
      />
    )
  }
}

export default PurchaseFormContainer
