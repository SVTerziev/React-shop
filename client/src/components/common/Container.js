import React from 'react'
import Grid from '@material-ui/core/Grid'
import Zoom from '@material-ui/core/Zoom'

import { withTheme } from '@material-ui/core/styles'

const Container = ({
  children,
  theme,
  hidden,
  justify = 'center',
  spacing = 0,
  hasZoom = false,
  zoomTimeout = {
    enter: theme.transitions.duration.enteringScreen,
    exit: theme.transitions.duration.leavingScreen
  },
  ...props
}) => {
  const content = (
    <Grid container justify='center' hidden={hidden}>
      <Grid item style={{ padding: spacing / 2 }} {...props}>
        <Grid container spacing={spacing} justify={justify}>
          {children}
        </Grid>
      </Grid>
    </Grid>
  )

  return hasZoom ? (
    <Zoom in timeout={zoomTimeout}>
      {content}
    </Zoom>
  ) : (
    content
  )
}

export default withTheme()(Container)
