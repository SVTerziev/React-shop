import React from 'react'
import Grid from '@material-ui/core/Grid'
import Hidden from '@material-ui/core/Hidden'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Link from 'react-router-dom/Link'

const Header = () => (
  <AppBar style={{ letterSpacing: '.1rem' }} position='fixed' elevation={6}>
    <Toolbar disableGutters style={{ marginLeft: 'calc(100vw - 100%)' }}>
      <Grid container justify='center' spacing={40}>
        <Hidden only='xs'>
          <Grid item>
            <Typography component={Link} to='/' variant='display2' color='inherit' style={{ fontWeight: 600 }}>
              Brand
            </Typography>
          </Grid>
          <Grid item>
            <Typography component={Link} to='/' variant='display2' color='inherit' style={{ fontWeight: 600 }}>
              ПРОДУКТИ
            </Typography>
          </Grid>
        </Hidden>
      </Grid>
    </Toolbar>
  </AppBar>
)

export default Header
