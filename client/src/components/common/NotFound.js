import React from 'react'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'

const NotFound = () => (
  <Grid container justify='center'>
    <Grid item xs={11} sm={10} md={9} lg={9} xl={5}>
      <Paper style={{ padding: '1rem' }} elevation={6}>
        <Typography variant='display2' color='secondary' align='center'>
          Страницата не съществува
        </Typography>
      </Paper>
    </Grid>
  </Grid>
)

export default NotFound
