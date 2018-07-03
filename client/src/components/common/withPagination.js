import React, { PureComponent } from 'react'
import { PaginationContext } from './PaginationContext'

const withPagination = (WrappedComponent, dataPromise) => {
  return class WithPagination extends PureComponent {
    state = {
      current: 0,
      pages: 0,
      perPage: 10,
      data: null,
      handleBack: null,
      handleNext: null,
      handleResize: null
    }

    handleBack = () => {
      this.setState(prevState => ({
        current: prevState.current - 1
      }))
    }

    handleNext = () => {
      this.setState(prevState => ({
        current: prevState.current + 1
      }))
    }

    handleResize = perPage => {
      if (this.state.perPage !== perPage) {
        this.setState({
          perPage,
          current: 0
        })
      }
    }

    async componentDidMount () {
      const data = await dataPromise

      this.setState({
        data,
        handleBack: this.handleBack,
        handleNext: this.handleNext,
        handleResize: this.handleResize
      })
    }

    render () {
      if (this.state.data === null) return null

      const { data, perPage, current, handleResize } = this.state
      const pageStart = current * perPage
      const pageEnd = pageStart + perPage
      console.log('withPagination render')
      return (
        <PaginationContext.Provider value={this.state}>
          <WrappedComponent
            pageStart={pageStart}
            pageEnd={pageEnd}
            perPage={perPage}
            current={current}
            data={data}
            onResize={handleResize}
            {...this.props}
          />
        </PaginationContext.Provider>
      )
    }
  }
}

export default withPagination
