import React, { PureComponent } from 'react'

import Button from '@material-ui/core/Button'
import MobileStepper from '@material-ui/core/MobileStepper'

import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft'
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight'

import { PaginationContext } from './../common/PaginationContext'

class Pagination extends PureComponent {
  render () {
    return (
      <PaginationContext.Consumer>
        {context => {
          const pages = Math.ceil(this.props.itemsNumber / context.perPage)
          return (
            <MobileStepper
              variant='dots'
              position='static'
              steps={pages}
              activeStep={context.current}
              backButton={
                <Button
                  variant='contained'
                  size='small'
                  color='secondary'
                  disabled={context.current === 0}
                  onClick={context.handleBack}
                >
                  <KeyboardArrowLeft />
                  Назад
                </Button>
              }
              nextButton={
                <Button
                  variant='contained'
                  size='small'
                  color='secondary'
                  disabled={context.current >= pages - 1}
                  onClick={context.handleNext}
                >
                  Напред
                  <KeyboardArrowRight />
                </Button>
              }
            />
          )
        }}
      </PaginationContext.Consumer>
    )
  }
}

export default Pagination
