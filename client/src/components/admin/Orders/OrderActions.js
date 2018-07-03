import React from 'react'

import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions'
import Button from '@material-ui/core/Button'
import { withStyles } from '@material-ui/core/styles'
import green from '@material-ui/core/colors/green'

const styles = theme => ({
  deleteButton: {
    backgroundColor: theme.palette.error.main,
    '&:hover': {
      backgroundColor: theme.palette.error.light
    }
  },
  completeButton: {
    backgroundColor: green[500],
    '&:hover': {
      backgroundColor: green[300]
    }
  }
})

const OrderActions = ({
  classes,
  onDelete,
  onComplete
}) =>
  <ExpansionPanelActions>
    <Button
      fullWidth
      variant='contained'
      size='large'
      color='primary'
      className={classes.deleteButton}
      onClick={onDelete}
    >
      Изтрий
    </Button>
    <Button
      fullWidth
      variant='contained'
      size='large'
      color='primary'
      className={classes.completeButton}
      onClick={onComplete}
    >
      Завършена
    </Button>
  </ExpansionPanelActions>

export default withStyles(styles)(OrderActions)
