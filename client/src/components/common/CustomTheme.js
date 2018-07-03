import React from 'react'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import blue from '@material-ui/core/colors/blue'
import blueGrey from '@material-ui/core/colors/blueGrey'

const theme = createMuiTheme({
  palette: {
    primary: {
      main: blue[600]
    },
    secondary: {
      main: blueGrey[500]
    },
    background: {
      default: '#E8F1F2'
    }
  },
  typography: {
    display4: { textDecoration: 'none' },
    display3: { textDecoration: 'none' },
    display2: { textDecoration: 'none' },
    display1: { textDecoration: 'none' },
    headline: { textDecoration: 'none' },
    title: { textDecoration: 'none' },
    subheading: { textDecoration: 'none' },
    body2: { textDecoration: 'none' },
    body1: { textDecoration: 'none' },
    caption: { textDecoration: 'none' },
    button: { textDecoration: 'none' },
    letterSpacing: 1.3
  }
})

const CustomTheme = props => (
  <MuiThemeProvider theme={theme} {...props}>
    {props.children}
  </MuiThemeProvider>
)

export default CustomTheme
