import React, { PureComponent } from 'react'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import Link from 'react-router-dom/Link'
import { withStyles } from '@material-ui/core/styles'
import classNames from 'classnames'

const styles = theme => ({
  card: {
    width: 300
  },
  media: {
    height: 250
  },
  justifyCenter: {
    justifyContent: 'center'
  },
  paddingBottom: {
    paddingBottom: theme.spacing.unit * 2
  },
  paddingTop: {
    paddingTop: theme.spacing.unit * 2
  },
  background: {
    backgroundColor: '#fafafa'
  },
  button: {
    fontSize: '1.2rem'
  },
  name: {
    minHeight: '4rem',
    display: 'flex',
    alignItems: 'center',
    letterSpacing: theme.typography.letterSpacing
  }
})

class ProductCard extends PureComponent {
  render () {
    const { classes, name, image, url, price } = this.props

    return (
      <Card raised className={classes.card}>
        <CardMedia
          className={classes.media}
          image={image || 'default.png'}
          title={name}
        />
        <CardContent className={classNames(classes.background, classes.paddingBottom)}>
          <Link to={'/details/' + url}>
            <Typography
              variant='headline'
              align='center'
              color='secondary'
              gutterBottom
              className={classNames(classes.name, classes.justifyCenter)}
            >
              {name}
            </Typography>
          </Link>
          <Divider light />
          <Typography
            variant='display1'
            component='b'
            align='center'
            color='secondary'
            className={classes.paddingTop}
          >
            {price} лв.
          </Typography>
        </CardContent>
        <CardActions
          className={classNames(classes.background, classes.justifyCenter, classes.paddingBottom)}
        >
          <Button
            component={Link}
            to={'/details/' + url}
            variant='contained'
            size='large'
            color='primary'
            className={classes.button}
          >
            Детайли
          </Button>
        </CardActions>
      </Card>
    )
  }
}

export default withStyles(styles)(ProductCard)
