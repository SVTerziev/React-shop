import React, { PureComponent, Fragment } from 'react'
import Divider from '@material-ui/core/Divider'
import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'

import green from '@material-ui/core/colors/green'
import { withStyles } from '@material-ui/core/styles'
import classNames from 'classnames'

import OrderSummary from './OrderSummary'
import OrderDetails from './OrderDetails'
import OrderActions from './OrderActions'

const styles = theme => ({
  divider: {
    margin: `0 ${theme.spacing.unit * 5}px`
  },
  completed: {
    backgroundColor: green[500]
  },
  notCompleted: {
    backgroundColor: theme.palette.primary.main
  },
  panel: {
    '& > *': {
      color: theme.palette.primary.contrastText
    }
  }
})

class Order extends PureComponent {
  render () {
    const { order, classes, onDelete, onComplete } = this.props

    return (
      <ExpansionPanel
        className={classNames(
          classes.panel,
          order.finished ? classes.completed : classes.notCompleted
        )}
      >
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon style={{ color: 'white' }} />}>
          <OrderSummary
            customer={order.customer}
            productName={order.productName}
            date={order.date}
          />
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <OrderDetails
            productPrice={order.productPrice}
            quantity={order.quantity}
            email={order.email}
            phone={order.phone}
            city={order.city}
            address={order.address}
            comment={order.comment}
          />
        </ExpansionPanelDetails>
        {!order.finished && (
          <Fragment>
            <Divider light className={classes.divider} />
            <OrderActions onDelete={onDelete(order.id)} onComplete={onComplete(order.id)} />
          </Fragment>
        )}
      </ExpansionPanel>
    )
  }
}
export default withStyles(styles)(Order)
