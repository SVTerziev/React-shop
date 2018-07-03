import React, { PureComponent } from 'react'

import Products from './Products'
import withPagination from './../common/withPagination'

import { getProducts } from './../../Data'

const productsPromise = getProducts()

class ProductsContainer extends PureComponent {
  render () {
    return (
      <Products {...this.props} />
    )
  }
}

export default withPagination(ProductsContainer, productsPromise)
