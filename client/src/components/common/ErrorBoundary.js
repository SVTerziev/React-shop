import React, { PureComponent } from 'react'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import { withStyles } from '@material-ui/core/styles'

const styles = theme => ({
  root: {
    cursor: 'pointer',
    letterSpacing: '.1rem',
    padding: '1rem',
    transition: theme.transitions.create('box-shadow', {
      duration: theme.transitions.duration.standard,
      easing: theme.transitions.easing.sharp
    }),
    '&:hover': {
      boxShadow: theme.shadows[12]
    }
  }
})

class ErrorBoundary extends PureComponent {
  state = {
    error: null
  }

  componentDidCatch (error) {
    this.setState({ error })
  }

  render () {
    const { error } = this.state
    const { classes } = this.props

    if (error) {
      return (
        <Grid container justify='center'>
          <Grid item xs={12} sm={9} md={7} lg={6} xl={4}>
            <Paper className={classes.root} elevation={6}>
              <Typography variant='display1' paragraph color='secondary' align='center'>
                Something went wrong
              </Typography>
              <Typography variant='headline' color='error' align='center'>
                {error.toString()}
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      )
    }

    return this.props.children
  }
}

export default withStyles(styles)(ErrorBoundary)
