import React from 'react'

import Grid from '@material-ui/core/Grid'
import ProductCard from './../Product/ProductCard'

const Products = props => (
  <div style={{ padding: '0 12px' }}>
    <Grid container justify='center' spacing={24}>
      {props.data.map(item => (
        <Grid key={item.id} item>
          <ProductCard name={item.name} price={item.price} image={item.image} url={item.url} />
        </Grid>
      ))}
    </Grid>
  </div>
)

export default Products
