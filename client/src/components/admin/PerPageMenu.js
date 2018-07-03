import React from 'react'
import { PaginationContext } from './../common/PaginationContext'

import ClickAwayListener from '@material-ui/core/ClickAwayListener'
import Divider from '@material-ui/core/Divider'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import IconButton from '@material-ui/core/IconButton'
import MoreVertIcon from '@material-ui/icons/MoreVert'

const perPageVariants = [5, 10, 15]

const PerPageMenu = ({ anchorEl, onMenuOpen, onMenuClose }) => (
  <PaginationContext.Consumer>
    {context =>
      <ClickAwayListener onClickAway={onMenuClose(context.perPage)}>
        <IconButton
          color='inherit'
          aria-label='Резултати на страница'
          aria-owns={anchorEl ? 'per-page' : null}
          onClick={onMenuOpen}
        >
          <MoreVertIcon />
        </IconButton>
        <Menu id='per-page' anchorEl={anchorEl} open={!!anchorEl}>
          <MenuItem disabled style={{ justifyContent: 'center' }}>
            На страница
          </MenuItem>
          <Divider light style={{ margin: '0 10px 10px' }} />
          {perPageVariants.map(variant =>
            <MenuItem
              key={variant}
              selected={context.perPage === variant}
              style={{ justifyContent: 'center' }}
              onClick={onMenuClose(variant)}
            >
              {variant}
            </MenuItem>
          )}
        </Menu>
      </ClickAwayListener>
    }
  </PaginationContext.Consumer>
)

export default PerPageMenu
