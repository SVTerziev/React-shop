import React from 'react'
import classNames from 'classnames'
import { withStyles } from '@material-ui/core/styles'
import red from '@material-ui/core/colors/red'
import green from '@material-ui/core/colors/green'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import Link from 'react-router-dom/Link'

import IconClear from '@material-ui/icons/Clear'
import IconCheck from '@material-ui/icons/Check'

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto'
  },
  row: {
    cursor: 'pointer',
    '&:nth-child(2n)': {
      backgroundColor: theme.palette.grey[50]
    },
    '&:hover': {
      backgroundColor: theme.palette.grey[200]
    }
  },
  headCell: {
    fontSize: theme.typography.fontSize * 2,
    textAlign: 'center',
    color: theme.palette.primary.contrastText,
    backgroundColor: theme.palette.primary.main
  },
  bodyCell: {
    fontSize: theme.typography.fontSize * 1.3,
    textAlign: 'center'
  },
  icon: {
    fontSize: '2.1rem'
  },
  red: {
    color: red[300]
  },
  green: {
    color: green[300]
  }
})

const ProductsDesktop = ({ products, classes }) => (
  <Paper elevation={6} className={classes.root}>
    <Table>
      <TableHead>
        <TableRow className={classes.row}>
          <TableCell className={classes.headCell}>Име</TableCell>
          <TableCell className={classes.headCell}>Цена</TableCell>
          <TableCell className={classes.headCell}>Линк</TableCell>
          <TableCell className={classes.headCell}>Задължителен коментар</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {products.map(product => (
          <TableRow className={classes.row} key={product.id}>
            <TableCell className={classes.bodyCell}>
              <Link to={`/details/${product.url}`}>{product.name}</Link>
            </TableCell>
            <TableCell className={classes.bodyCell}>{product.price} лв.</TableCell>
            <TableCell className={classes.bodyCell}>{product.url}</TableCell>
            <TableCell className={classes.bodyCell}>
              {+product.isCommentRequired ? (
                <IconCheck className={classNames(classes.icon, classes.green)} />
              ) : (
                <IconClear className={classNames(classes.icon, classes.red)} />
              )}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </Paper>
)

export default withStyles(styles)(ProductsDesktop)
