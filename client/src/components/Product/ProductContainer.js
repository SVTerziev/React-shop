import React, { PureComponent } from 'react'
import Redirect from 'react-router-dom/Redirect'
import Grid from '@material-ui/core/Grid'
import CircularProgress from '@material-ui/core/CircularProgress'

import Product from './Product'

class ProductContainer extends PureComponent {
  state = {
    error: false,
    loading: true,
    name: '',
    images: null,
    description: '',
    price: '',
    commentRequired: false
  }

  async componentDidMount () {
    const response = await fetch('http://localhost/product/' + this.props.match.params.url)
    const data = await response.json()

    this.setState({
      ...data,
      loading: false
    })
  }

  render () {
    const { error, loading, name, ...rest } = this.state
    const product = { name, ...rest }

    if (error) {
      return <Redirect to='/' />
    }

    if (loading || !name) {
      return (
        <Grid container justify='center'>
          <CircularProgress thickness={8} size={200} />
        </Grid>
      )
    }

    return <Product product={product} />
  }
}

export default ProductContainer
