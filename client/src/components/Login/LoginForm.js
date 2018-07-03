import React from 'react'

import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress'
import { withStyles } from '@material-ui/core/styles'

const styles = {
  paper: {
    padding: '3rem'
  },
  submitButton: {
    fontSize: '1.3rem'
  }
}

const LoginForm = ({ classes, loading, error, handleSubmit, handleChange }) => (
  <Grid container justify='center'>
    <Grid item xs={10} sm={8} lg={4}>
      <Paper elevation={10} className={classes.paper}>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            autoFocus
            margin='normal'
            name='username'
            label='Потребител'
            onChange={handleChange}
            error={error}
          />
          <TextField
            fullWidth
            margin='normal'
            type='password'
            name='password'
            label='Парола'
            onChange={handleChange}
            error={error}
          />
          <Button
            fullWidth
            variant='contained'
            size='large'
            color='primary'
            type='submit'
            className={classes.submitButton}
          >
            {loading ? <CircularProgress color='inherit' thickness={8} size={29} /> : 'Вход'}
          </Button>
        </form>
      </Paper>
    </Grid>
  </Grid>
)

export default withStyles(styles)(LoginForm)
