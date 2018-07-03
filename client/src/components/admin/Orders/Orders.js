import React from 'react'

import Grid from '@material-ui/core/Grid'

import OrdersMenu from './OrdersMenu'
import Order from './Order'
import SearchOrder from './SearchOrder'
import Pagination from './../../common/Pagination'

const Orders = ({
  activeTab,
  filteredOrders,
  ordersNumber,
  handleMenuOpen,
  handleMenuClose,
  handleComplete,
  handleChange,
  handleSearch,
  anchorEl,
  search,
  numberOf,
  handleDelete
}) =>
  <Grid container justify='center' style={{ wordBreak: 'break-all' }}>
    <Grid item xs={11} lg={6}>
      <SearchOrder value={search} onChange={handleSearch} />
      <OrdersMenu
        anchorEl={anchorEl}
        active={activeTab}
        numberOf={numberOf}
        onMenuOpen={handleMenuOpen}
        onMenuClose={handleMenuClose}
        onChange={handleChange}
      />
      {filteredOrders.map(order => (
        <Order key={order.id} order={order} onComplete={handleComplete} onDelete={handleDelete} />
      ))}
      <Pagination itemsNumber={ordersNumber} />
    </Grid>
  </Grid>

export default Orders
