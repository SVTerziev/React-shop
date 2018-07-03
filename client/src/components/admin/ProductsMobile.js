import React, { Fragment } from 'react'
import { withStyles } from '@material-ui/core/styles'
import classNames from 'classnames'
import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions'
import Typography from '@material-ui/core/Typography'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import HttpIcon from '@material-ui/icons/Http'
import Button from '@material-ui/core/Button'
import Divider from '@material-ui/core/Divider'
import Link from 'react-router-dom/Link'

const styles = theme => ({
  price: {
    fontSize: theme.typography.fontSize * 1.2,
    color: theme.palette.text.secondary
  },
  details: {
    alignItems: 'center'
  },
  column: {
    flexBasis: '50%'
  },
  wordBreak: {
    wordBreak: 'break-all'
  },
  description: {
    flexBasis: '69%'
  },
  url: {
    flexBasis: '31%'
  },
  helper: {
    borderLeft: `2px solid ${theme.palette.divider}`,
    padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`
  },
  actions: {
    justifyContent: 'center'
  }
})

const ProductsMobile = ({ products, classes }) =>
  <Fragment>
    {products.map(product => (
      <ExpansionPanel key={product.id}>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <Typography className={classNames(classes.column, classes.wordBreak)}>
            {product.name}
          </Typography>
          <Typography className={classNames(classes.column, classes.price)} align='center'>
            {product.price} лв.
          </Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails className={classes.details}>
          <div className={classNames(classes.description, classes.helper)}>
            <Typography variant='caption' className={classes.wordBreak}>
              {product.description || 'Няма описание'}
            </Typography>
          </div>
          <div className={classes.url}>
            <HttpIcon style={{ fontSize: '2.1rem' }} />
            <div className={classes.helper}>
              <Typography variant='caption' className={classes.wordBreak}>
                <Link to={product.url}>{product.url}</Link>
              </Typography>
            </div>
          </div>
        </ExpansionPanelDetails>
        <Divider />
        <ExpansionPanelActions className={classes.actions}>
          <Button size='large' color='primary'>
            Промени
          </Button>
        </ExpansionPanelActions>
      </ExpansionPanel>
    ))}
  </Fragment>

export default withStyles(styles)(ProductsMobile)
