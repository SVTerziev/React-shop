import React, { PureComponent } from 'react'

import Paper from '@material-ui/core/Paper'
import TextField from '@material-ui/core/TextField'
import { withStyles } from '@material-ui/core/styles'
import grey from '@material-ui/core/colors/grey'
import blue from '@material-ui/core/colors/blue'

import Grid from '@material-ui/core/Grid'

const styles = theme => ({
  root: {
    backgroundColor: grey[50],
    marginBottom: theme.spacing.unit,
    padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px ${theme.spacing.unit * 2}px`
  },
  center: {
    fontSize: '1.3rem',
    letterSpacing: 1.5,
    textAlign: 'center'
  },
  label: {
    position: 'inherit',
    fontSize: '1.3rem',
    transformOrigin: 'center',
    textAlign: 'center',
    color: blue[700]
  },
  formControl: {
    'label + &': {
      marginTop: 0
    }
  },
  underline: {
    '&:before': {
      borderBottom: `1px solid ${blue[700]}`
    },
    '&:after': {
      borderBottom: `2px solid ${theme.palette.primary.main}`
    }
  }
})

class SearchOrder extends PureComponent {
  render () {
    const { classes, search, onChange } = this.props

    return (
      <Grid container justify='center'>
        <Grid item xs={12} sm={10} md={8}>
          <Paper elevation={9} className={classes.root}>
            <TextField
              fullWidth
              inputProps={{
                className: classes.center
              }}
              InputLabelProps={{
                classes: { root: classes.label }
              }}
              // eslint-disable-next-line
              InputProps={{
                classes: { formControl: classes.formControl, underline: classes.underline }
              }}
              type='search'
              label='Име на клиент или продукт'
              value={search}
              onChange={onChange}
            />
          </Paper>
        </Grid>
      </Grid>
    )
  }
}
export default withStyles(styles)(SearchOrder)
