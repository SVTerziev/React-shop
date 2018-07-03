import React, { Fragment } from 'react'
import Typography from '@material-ui/core/Typography'

const OrderSummary = ({
  date,
  customer,
  productName
}) =>
  <Fragment>
    <small>
      {new Date(date).toLocaleString('bg', {
        timeZone: 'Europe/Sofia',
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric'
      })}
    </small>
    <Typography variant='subheading' align='center' color='inherit' style={{ flex: 1 }}>
      {customer}
    </Typography>
    <Typography variant='subheading' align='center' color='inherit' style={{ flex: 1 }}>
      {productName}
    </Typography>
  </Fragment>

export default OrderSummary
