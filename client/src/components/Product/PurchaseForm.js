import React, { PureComponent } from 'react'

import FormControl from '@material-ui/core/FormControl'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid'
import CircularProgress from '@material-ui/core/CircularProgress'

import classNames from 'classnames'
import green from '@material-ui/core/colors/green'
import { withStyles } from '@material-ui/core/styles'

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  fontAdjust: {
    fontSize: '1.2rem',
    letterSpacing: theme.typography.letterSpacing
  },
  submit: {
    fontSize: '1.7rem',
    '&:disabled': {
      color: '#ddd'
    }
  },
  submitContainer: {
    cursor: 'not-allowed',
    backgroundColor: theme.palette.primary.main
  },
  ordered: {
    backgroundColor: green[500]
  },
  margin: {
    marginTop: theme.spacing.unit / 4,
    marginBottom: theme.spacing.unit / 4,
    marginLeft: theme.spacing.unit / 2,
    marginRight: theme.spacing.unit / 2
  },
  inputsWidthAdjust: {
    width: '100%',
    [theme.breakpoints.only('sm')]: {
      width: '95%'
    },
    [theme.breakpoints.up('lg')]: {
      width: '95%'
    }
  }
})

class PurchaseForm extends PureComponent {
  render () {
    const {
      classes,
      ordered,
      loading,
      quantity,
      name,
      phone,
      email,
      city,
      address,
      commentRequired,
      comment,
      formCompleted,
      handleChange,
      handleSubmit
    } = this.props

    return (
      <Grid item xs={12}>
        <form onSubmit={handleSubmit} className={classes.root}>
          <Grid item xs={12} sm={4} md={12} lg={3}>
            <TextField
              required
              type='number'
              name='quantity'
              label='Количество'
              inputProps={{ min: 1 }}
              InputLabelProps={{ className: classes.fontAdjust }}
              value={quantity}
              className={classNames(classes.margin, classes.inputsWidthAdjust)}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={8} md={12} lg={9}>
            <TextField
              fullWidth
              required
              name='name'
              autoComplete='name'
              label='Три имена'
              value={name}
              className={classes.margin}
              InputLabelProps={{ className: classes.fontAdjust }}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={5} md={12} lg={5}>
            <TextField
              required
              type='tel'
              autoComplete='tel'
              name='phone'
              label='Телефон'
              inputProps={{ autoComplete: 'tel-national' }}
              InputLabelProps={{ className: classes.fontAdjust }}
              value={phone}
              className={classNames(classes.margin, classes.inputsWidthAdjust)}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={7} md={12} lg={7}>
            <TextField
              fullWidth
              type='email'
              name='email'
              autoComplete='email'
              label='Мейл'
              value={email}
              className={classes.margin}
              InputLabelProps={{ className: classes.fontAdjust }}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={5} md={12} lg={5}>
            <TextField
              required
              name='city'
              label='Град'
              autoComplete='address-level2'
              value={city}
              className={classNames(classes.margin, classes.inputsWidthAdjust)}
              InputLabelProps={{ className: classes.fontAdjust }}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={7} md={12} lg={7}>
            <TextField
              fullWidth
              required
              name='address'
              label='Адрес'
              autoComplete='street-address'
              value={address}
              className={classes.margin}
              InputLabelProps={{ className: classes.fontAdjust }}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <TextField
              fullWidth
              multiline
              required={commentRequired}
              rows='5'
              name='comment'
              label='Коментар към поръчката'
              value={comment}
              className={classes.margin}
              InputLabelProps={{ className: classes.fontAdjust }}
              onChange={handleChange}
            />
            <FormControl fullWidth className={classNames(classes.margin, classes.submitContainer)}>
              <Button
                variant='contained'
                color='primary'
                type='submit'
                className={classNames(classes.submit, ordered && classes.ordered)}
                disabled={!formCompleted}
              >
                {loading ? (
                  <CircularProgress color='inherit' thickness={8} size={38} />
                ) : ordered ? (
                  'Поръчано'
                ) : (
                  'Поръчай'
                )}
              </Button>
            </FormControl>
          </Grid>
        </form>
      </Grid>
    )
  }
}
export default withStyles(styles)(PurchaseForm)
