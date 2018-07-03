import React, { Fragment } from 'react'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import FileUpload from '@material-ui/icons/FileUpload'
import { withStyles } from '@material-ui/core/styles'
import classNames from 'classnames'

const styles = theme => ({
  root: {
    justifyContent: 'space-around',
    border: '1px solid rgba(0, 0, 0, 0.1)',
    borderTopLeftRadius: theme.spacing.unit / 1.3,
    borderTopRightRadius: theme.spacing.unit / 1.3,
    minHeight: 246,
    marginTop: 5
  },
  thumbnail: {
    cursor: 'pointer',
    transitionDuration: theme.transitions.duration.short,
    transitionTimingFunction: theme.transitions.easing.sharp,
    '&:hover': {
      filter: 'blur(2px)'
    }
  },
  thumbnails: {
    display: 'grid',
    grid: 'auto-flow / repeat(auto-fill, 80px)',
    gridGap: '4px 1px'
  },
  empty: {
    display: 'flex',
    alignItems: 'center',
    textAlign: 'center'
  },
  button: {
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    marginBottom: 20
  }
})

const Images = ({ thumbnails, classes, handleDrag, clearImage, handleImageChange, inputRef }) => {
  const hasThumbs = thumbnails.length > 0

  return (
    <Fragment>
      <div
        className={classNames(classes.root, {
          [classes.thumbnails]: hasThumbs,
          [classes.empty]: !hasThumbs
        })}
        onDrop={handleDrag}
        onDragOver={handleDrag}
      >
        {hasThumbs ? (
          thumbnails.map((thumbnail, index) => (
            <img
              key={index}
              src={thumbnail.src}
              height={thumbnail.height}
              width={thumbnail.width}
              className={classes.thumbnail}
              onClick={clearImage(index)}
              alt={thumbnail.name}
            />
          ))
        ) : (
          <Typography variant='display2' style={{ color: 'rgba(0, 0, 0, 0.3 ' }}>
            Няма снимки
          </Typography>
        )}
      </div>
      <Button
        fullWidth
        component='label'
        variant='contained'
        color='secondary'
        className={classes.button}
      >
        <FileUpload style={{ width: '4rem', height: '4rem' }} />
        <input
          multiple
          type='file'
          accept='image/*'
          onChange={handleImageChange}
          style={{ display: 'none' }}
          ref={inputRef}
        />
      </Button>
    </Fragment>
  )
}

export default withStyles(styles)(Images)
