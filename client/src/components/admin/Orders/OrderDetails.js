import React, { Fragment } from 'react'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'
import classNames from 'classnames'

const styles = theme => ({
  flex: {
    display: 'flex'
  },
  flexDirectionColumn: {
    flexDirection: 'column'
  },
  column: {
    flex: '1 33%',
    alignItems: 'center'
  },
  helper: {
    borderLeft: `2px solid rgba(255, 255, 255, .5)`,
    padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`
  },
  comment: {
    whiteSpace: 'pre-wrap',
    justifyContent: 'center'
  }
})

const OrderDetails = ({
  classes,
  productPrice,
  quantity,
  email,
  phone,
  city,
  address,
  comment
}) =>
  <Fragment>
    <div className={classNames(classes.flex, classes.column, classes.helper)}>
      <Typography
        variant='subheading'
        align='center'
        color='inherit'
        className={classNames(classes.flex, classes.flexDirectionColumn, classes.column)}
      >
        <span>Количество</span>
        <span>Общо</span>
      </Typography>
      <Typography
        variant='subheading'
        align='center'
        color='inherit'
        className={classNames(classes.flex, classes.flexDirectionColumn, classes.column)}
      >
        <span>{quantity}</span>
        <span>{productPrice * quantity} лв.</span>
      </Typography>
    </div>
    <div className={classNames(classes.flex, classes.column, classes.helper)}>
      <Typography
        variant='subheading'
        align='center'
        color='inherit'
        className={classNames(classes.flex, classes.flexDirectionColumn, classes.column)}
      >
        <span>{email}</span>
        <span>{phone}</span>
      </Typography>
      <Typography
        variant='subheading'
        align='center'
        color='inherit'
        className={classNames(classes.flex, classes.flexDirectionColumn, classes.column)}
      >
        <span>{city}</span>
        <span>{address}</span>
      </Typography>
    </div>
    <div className={classNames(classes.flex, classes.column, classes.helper)}>
      <Typography variant='subheading' align='center' color='inherit' className={classes.comment}>
        {comment}
      </Typography>
    </div>
  </Fragment>

export default withStyles(styles)(OrderDetails)
