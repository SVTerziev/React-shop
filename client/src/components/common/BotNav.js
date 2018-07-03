import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import BottomNavigation from '@material-ui/core/BottomNavigation'
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction'
import AppsIcon from '@material-ui/icons/Apps'
import LocalHospitalIcon from '@material-ui/icons/LocalHospital'
import Link from 'react-router-dom/Link'

const styles = theme => ({
  root: {
    width: '100%',
    position: 'fixed',
    bottom: 0,
    zIndex: 1000,
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText
  },
  actionRoot: {
    paddingTop: 0,
    paddingBottom: 0
  },
  largeIcon: {
    width: 30,
    height: 30,
    color: 'white'
  },
  label: {
    fontSize: theme.typography.pxToRem(theme.typography.fontSize * 1.3),
    color: theme.palette.primary.contrastText
  }
})

const BotNav = ({ classes }) =>
  <BottomNavigation showLabels className={classes.root}>
    <BottomNavigationAction
      classes={{
        root: classes.actionRoot,
        label: classes.label
      }}
      icon={<LocalHospitalIcon className={classes.largeIcon} />}
      label='Brand'
    />
    <BottomNavigationAction
      classes={{
        root: classes.actionRoot,
        label: classes.label
      }}
      icon={<AppsIcon className={classes.largeIcon} />}
      component={Link}
      to='/'
      label='Продукти'
    />
  </BottomNavigation>

export default withStyles(styles)(BotNav)
