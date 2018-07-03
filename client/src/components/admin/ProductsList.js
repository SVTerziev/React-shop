/* global fetch */
import React, { PureComponent } from 'react'

import Grid from '@material-ui/core/Grid'

import ProductsDesktop from './ProductsDesktop'
import ProductsMobile from './ProductsMobile'

class ProductsList extends PureComponent {
  state = {
    products: null
  }

  async componentDidMount () {
    const response = await fetch('http://localhost/products')
    const products = await response.json()

    products.sort((a, b) => b.id - a.id)
    this.setState({ products })
  }

  render () {
    const { products } = this.state

    if (products === null) return false

    return (
      <Grid container justify='center'>
        <Grid item md={11} lg={9} hidden={{ smDown: true }}>
          <ProductsDesktop products={products} />
        </Grid>
        <Grid item xs={11} sm={11} hidden={{ mdUp: true }}>
          <ProductsMobile products={products} />
        </Grid>
      </Grid>
    )
  }
}

export default ProductsList
