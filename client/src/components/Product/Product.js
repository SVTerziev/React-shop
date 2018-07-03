import React from 'react'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'
import Hidden from '@material-ui/core/Hidden'
import Zoom from '@material-ui/core/Zoom'
import Divider from '@material-ui/core/Divider'

import Container from './../common/Container'
import PurchaseFormContainer from './PurchaseFormContainer'
import Carousel from './Carousel'

const styles = theme => ({
  root: {
    padding: theme.spacing.unit * 6,
    [theme.breakpoints.only('xs')]: {
      padding: theme.spacing.unit * 2
    }
  },
  name: {
    fontSize: '1.5rem',
    [theme.breakpoints.up('sm')]: {
      fontSize: '2.125rem'
    },
    letterSpacing: theme.typography.letterSpacing,
    marginBottom: '0.5rem',
    wordBreak: 'break-all'
  },
  description: {
    textAlign: 'justify',
    letterSpacing: theme.typography.letterSpacing,
    whiteSpace: 'pre-wrap',
    wordBreak: 'break-all'
  },
  divider: {
    marginTop: theme.spacing.unit * 2,
    marginBottom: theme.spacing.unit * 2
  }
})

const Product = ({ classes, product }) => (
  <Container spacing={16} xs={11} lg={10}>
    <Zoom in timeout={300}>
      <Grid item xs={12} md={6}>
        <Paper elevation={8} className={classes.root}>
          <Hidden mdUp>
            <Typography align='center' className={classes.name}>
              {product.name}
            </Typography>
          </Hidden>
          <Carousel images={product.images} />
        </Paper>
      </Grid>
    </Zoom>
    <Zoom in timeout={370}>
      <Grid item xs={12} md={6}>
        <Paper elevation={8} className={classes.root}>
          <Typography align='center' className={classes.name}>
            {product.name}
          </Typography>
          <Typography variant='display1' align='center' color='secondary' gutterBottom>
            {product.price} лв.
          </Typography>
          <Typography variant='subheading' className={classes.description}>
            {product.description}
          </Typography>
          <Divider inset light className={classes.divider} />
          <PurchaseFormContainer commentRequired={product.commentRequired} />
        </Paper>
      </Grid>
    </Zoom>
  </Container>
)

export default withStyles(styles)(Product)
