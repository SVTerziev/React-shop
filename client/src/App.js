import React from 'react'

import Hidden from '@material-ui/core/Hidden'
import CssBaseline from '@material-ui/core/CssBaseline'
import CustomTheme from './components/common/CustomTheme'
import ErrorBoundary from './components/common/ErrorBoundary'
import Header from './components/common/Header'
import BotNav from './components/common/BotNav'

import Routes from './Routes'

import './App.css'

const App = () => (
  <React.Fragment>
    <CssBaseline />
    <CustomTheme>
      <ErrorBoundary>
        <Hidden only='xs'>
          <Header />
        </Hidden>
        <Routes />
        <Hidden smUp>
          <BotNav />
        </Hidden>
      </ErrorBoundary>
    </CustomTheme>
  </React.Fragment>
)

export default App
