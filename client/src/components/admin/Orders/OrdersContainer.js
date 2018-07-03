import React, { PureComponent } from 'react'

import Orders from './Orders'
import withPagination from './../../common/withPagination'
import { getOrders } from './../../../Data'

const ordersPromise = getOrders()

class OrdersContainer extends PureComponent {
  state = {
    anchorEl: null,
    error: null,
    search: '',
    activeTab: 0
  }

  handleDelete = id => () => {
    fetch(`http://localhost/order/${id}`, {
      method: 'DELETE'
    })
  }

  handleComplete = id => async e => {
    const payload = { id }
    const response = await fetch(`http://localhost/order/${id}`, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    })
    const result = await response.json()

    let order = null
    let orders = null

    if (result.success) {
      orders = orders.filter(order => order.id !== id)
      order = orders.find(order => order.id === id)
      order.finished = 1

      this.setState({
        orders: [...orders, order]
      })
    } else {
      this.setState(...result)
    }
  }

  handleMenuOpen = e => {
    this.setState({ anchorEl: e.currentTarget })
  }

  handleMenuClose = perPage => e => {
    this.setState({ anchorEl: null })
    this.props.onResize(perPage)
  }

  handleChange = (e, activeTab) => {
    this.setState({ activeTab })
  }

  handleSearch = e => {
    this.setState({ search: e.target.value })
  }

  sortByDate = elements => elements.sort((a, b) => b.date - a.date)

  sortAll = ({ finished, unfinished, all }) => {
    this.sortByDate(finished)
    this.sortByDate(unfinished)
    this.sortByDate(all)
  }

  filtered = (orders, value) =>
    orders.filter(
      order =>
        order.customer.toLowerCase().includes(value) ||
        order.productName.toLowerCase().includes(value)
    )

  filterAll = ({ unfinishedRaw, finishedRaw, allRaw }, value = '') => {
    value = value.toLowerCase()
    const unfinished = this.filtered(unfinishedRaw, value)
    const finished = this.filtered(finishedRaw, value)
    const all = this.filtered(allRaw, value)

    return { unfinished, finished, all }
  }

  render () {
    const { anchorEl, activeTab, search } = this.state
    const {
      perPage,
      pageStart,
      pageEnd,
      data: { unfinished: unfinishedRaw, finished: finishedRaw, all: allRaw }
    } = this.props

    const { unfinished, finished, all } = this.filterAll(
      { unfinishedRaw, finishedRaw, allRaw },
      search
    )

    this.sortAll({
      unfinished,
      finished,
      all
    })

    const numberOf = {
      unfinished: unfinished.length,
      finished: finished.length,
      all: all.length
    }

    let filteredOrders = null
    let ordersNumber = null
    switch (activeTab) {
      case 0:
        ordersNumber = numberOf.unfinished
        filteredOrders = unfinished.slice(pageStart, pageEnd)
        break
      case 1:
        ordersNumber = numberOf.finished
        filteredOrders = finished.slice(pageStart, pageEnd)
        break
      case 2:
        ordersNumber = numberOf.all
        filteredOrders = all.slice(pageStart, pageEnd)
        break
      default:
        ordersNumber = numberOf.unfinished
        filteredOrders = unfinished.slice(pageStart, pageEnd)
    }

    return (
      <Orders
        filteredOrders={filteredOrders}
        ordersNumber={ordersNumber}
        anchorEl={anchorEl}
        activeTab={activeTab}
        handleChange={this.handleChange}
        handleMenuClose={this.handleMenuClose}
        handleMenuOpen={this.handleMenuOpen}
        handleComplete={this.handleComplete}
        handleSearch={this.handleSearch}
        handleDelete={this.handleDelete}
        numberOf={numberOf}
        search={this.search}
        perPage={perPage}
      />
    )
  }
}

export default withPagination(OrdersContainer, ordersPromise)
