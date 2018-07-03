import React from 'react'

import AppBar from '@material-ui/core/AppBar'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Badge from '@material-ui/core/Badge'

import orange from '@material-ui/core/colors/orange'
import { withStyles } from '@material-ui/core/styles'

import PerPageMenu from './../PerPageMenu'

const styles = theme => ({
  root: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: orange[700],
    marginBottom: theme.spacing.unit
  },
  tabs: {
    flex: 1
  },
  badge: {
    padding: `0 ${theme.spacing.unit * 2}px`
  }
})

const OrdersMenu = ({ numberOf, active, onChange, classes, onMenuOpen, onMenuClose, anchorEl }) =>
  <AppBar position='static' className={classes.root}>
    <Tabs
      centered
      indicatorColor='primary'
      value={active}
      className={classes.tabs}
      onChange={onChange}
    >
      <Tab
        disabled={!numberOf.unfinished}
        label={
          <Badge badgeContent={numberOf.unfinished} color='primary' className={classes.badge}>
            Незавършени
          </Badge>
        }
      />
      <Tab
        disabled={!numberOf.finished}
        label={
          <Badge badgeContent={numberOf.finished} color='primary' className={classes.badge}>
            Завършени
          </Badge>
        }
      />
      <Tab
        disabled={!numberOf.all}
        label={
          <Badge badgeContent={numberOf.all} color='primary' className={classes.badge}>
            Всички
          </Badge>
        }
      />
    </Tabs>
    <PerPageMenu
      anchorEl={anchorEl}
      onMenuOpen={onMenuOpen}
      onMenuClose={onMenuClose}
    />
  </AppBar>

export default withStyles(styles)(OrdersMenu)
