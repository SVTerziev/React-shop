/* global fetch, FormData, Image, URL */
import React, { Component } from 'react'

import Images from './Images'

import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import Switch from '@material-ui/core/Switch'
import InputAdornment from '@material-ui/core/InputAdornment'
import CircularProgress from '@material-ui/core/CircularProgress'

import Redirect from 'react-router-dom/Redirect'

import { withStyles } from '@material-ui/core/styles'
import { withAuth } from '@okta/okta-react'

import Container from './../common/Container'

const validate = {
  name: 'Поне 2 символа',
  price: 'Цената трябва да бъде поне 1',
  url: 'Съществуващ или невалиден линк'
}

const styles = theme => ({
  paper: {
    padding: theme.spacing.unit * 2
  },
  button: {
    height: 100,
    fontSize: '2rem',
    letterSpacing: 2
  },
  commentAlign: {
    paddingTop: '1rem'
  },
  inputFullWidth: {
    [theme.breakpoints.up('xs')]: {
      width: '100%'
    }
  },
  hidden: {
    display: 'none'
  }
})

class AddProduct extends Component {
  constructor (props) {
    super(props)

    this.state = {
      images: [],
      thumbnails: [],
      name: '',
      url: '',
      price: 0,
      description: '',
      commentRequired: false,
      loading: false,
      success: false,
      error: {
        name: false,
        url: false,
        price: false,
        description: false
      }
    }
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit = async e => {
    e.preventDefault()
    this.setState({ loading: true })

    const { images, thumbnails, error, loading, success, ...rest } = this.state
    const formData = new FormData()

    images.forEach(image => {
      formData.append('images[]', image)
    })

    for (let prop in rest) {
      formData.append(prop, rest[prop])
    }

    const response = await fetch('http://localhost/add', {
      headers: {
        Accept: 'application/json'
        // Authorization: 'Bearer ' + (await this.props.auth.getAccessToken())
      },
      method: 'POST',
      body: formData
    })

    const data = await response.json()

    this.setState({
      ...data,
      loading: false
    })
  }

  handleFiles = files => {
    const { images, thumbnails } = this.state
    let newImages = []
    let newThumbs = []

    Array.from(files).forEach(file => {
      const matching = images.filter(img => {
        return (
          img.type === file.type && img.size === file.size && img.lastModified === file.lastModified
        )
      })

      if (!matching.length) {
        let image = new Image()
        image.height = 120
        image.width = 80
        image.src = URL.createObjectURL(file)

        newImages.push(file)
        newThumbs.push(image)
      }
    })

    this.setState({
      images: [ ...images, ...newImages ],
      thumbnails: [ ...thumbnails, ...newThumbs ]
    })
  }

  handleDrag = e => {
    e.preventDefault()

    if (e.type === 'drop') {
      this.handleFiles(e.dataTransfer.files)
    }
  }

  handleImageChange = e => {
    this.handleFiles(e.target.files)
  }

  clearImage = index => () => {
    let { images, thumbnails } = this.state

    this.setState({
      images: images.filter((image, imageIndex) => imageIndex !== index),
      thumbnails: thumbnails.filter((image, imageIndex) => imageIndex !== index)
    })
  }

  commentChange = (e, isChecked) => {
    this.setState({ commentRequired: isChecked })
  }

  render () {
    const { classes } = this.props
    const { error } = this.state

    if (this.state.success) {
      return <Redirect to='/all' />
    }

    return (
      <Container xs={11} hasZoom>
        <Grid item xs={12} sm={11} md={9} lg={8}>
          <Paper className={classes.paper}>
            <form onSubmit={this.handleSubmit}>
              <Typography variant='display3' style={{ textAlign: 'center' }}>
                Нов продукт
              </Typography>
              <TextField
                required
                autoFocus
                fullWidth
                name='name'
                label='Име'
                margin='normal'
                error={error.name}
                helperText={validate.name}
                FormHelperTextProps={{
                  classes: { root: !error.name ? classes.hidden : '' },
                  error: true
                }}
                onChange={this.handleChange}
              />
              <TextField
                fullWidth
                multiline
                rows={3}
                rowsMax={10}
                name='description'
                label='Описание'
                margin='normal'
                error={error.description}
                onChange={this.handleChange}
              />
              <Grid container justify='space-between'>
                <Grid item xs={12} sm={6} md={5} lg={4} xl={3} className={classes.commentAlign}>
                  <Typography variant='subheading' style={{ display: 'inline' }}>
                    Задължителен коментар
                  </Typography>
                  <Switch
                    color='primary'
                    checked={this.state.commentRequired}
                    value={this.state.commentRequired.toString()}
                    onChange={this.commentChange}
                  />
                </Grid>
                <Grid item xs={12} sm={2} md={2}>
                  <TextField
                    required
                    className={classes.inputFullWidth}
                    type='number'
                    name='price'
                    label='Цена'
                    margin='dense'
                    error={error.price}
                    helperText={validate.price}
                    FormHelperTextProps={{
                      classes: { root: !error.price ? classes.hidden : '' },
                      error: true
                    }}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment disableTypography position='end'>
                          лв.
                        </InputAdornment>
                      )
                    }}
                    onChange={this.handleChange}
                  />
                </Grid>
                <Grid item xs={12} sm={3} md={4} lg={5} xl={6}>
                  <TextField
                    required
                    className={classes.inputFullWidth}
                    name='url'
                    label='Линк'
                    margin='dense'
                    helperText={validate.url}
                    FormHelperTextProps={{
                      classes: { root: !error.url ? classes.hidden : '' },
                      error: true
                    }}
                    error={error.url}
                    onChange={this.handleChange}
                  />
                </Grid>
              </Grid>
              <Images
                images={this.state.images}
                thumbnails={this.state.thumbnails}
                handleDrag={this.handleDrag}
                handleImageChange={this.handleImageChange}
                clearImage={this.clearImage}
                inputRef={input => (this.input = input)}
              />
              <Button
                fullWidth
                variant='contained'
                color='primary'
                type='submit'
                className={classes.button}
              >
                {this.state.loading ? (
                  <CircularProgress color='inherit' thickness={8} size={60} />
                ) : (
                  'Добави'
                )}
              </Button>
            </form>
          </Paper>
        </Grid>
      </Container>
    )
  }
}

export default withStyles(styles)(withAuth(AddProduct))
