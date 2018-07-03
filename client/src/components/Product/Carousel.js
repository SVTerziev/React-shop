import React, { PureComponent } from 'react'
import { withStyles } from '@material-ui/core/styles'
import classNames from 'classnames'

const styles = theme => ({
  figure: {
    margin: 0
  },
  thumbnails: {
    display: 'grid',
    grid: 'auto-flow / repeat(auto-fill, 80px)',
    gridGap: '4px 4px',
    marginTop: '1rem',
    justifyContent: 'center',
    '& > img': {
      cursor: 'pointer'
    }
  },
  current: {
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: theme.palette.primary.main
  }
})

class Carousel extends PureComponent {
  state = {
    current: 0
  }

  handleChange = current => () => {
    this.setState({ current })
  }

  render () {
    const { current } = this.state
    const { classes, images } = this.props
    const image = images[current] || '/default.png'

    return (
      <figure className={classes.figure}>
        <div style={{ overflow: 'hidden' }}>
          <div className='product-image' style={{ backgroundImage: 'url(' + image + ')' }} />
        </div>
        <figcaption className={classes.thumbnails}>
          {images.map((image, index) => (
            <img
              key={index}
              src={image}
              className={classNames({ [classes.current]: current === index })}
              width='80'
              height='80'
              onClick={this.handleChange(index)}
              alt={image.name}
            />
          ))}
        </figcaption>
      </figure>
    )
  }
}

export default withStyles(styles)(Carousel)
