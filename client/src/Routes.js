import React from 'react'

import Switch from 'react-router-dom/Switch'
import Route from 'react-router-dom/Route'

import Products from './components/Products/ProductsContainer'
import Product from './components/Product/ProductContainer'
import AddProduct from './components/admin/AddProduct'
import ProductsList from './components/admin/ProductsList'
import Orders from './components/admin/Orders/OrdersContainer'
import NotFound from './components/common/NotFound'
import Login from './components/Login/Login'

import { Security, SecureRoute, ImplicitCallback } from '@okta/okta-react'
import { CONFIG } from './config'

const onAuthRequired = ({ history }) => {
  history.push('/login')
}

const Routes = () => (
  <Security
    issuer={CONFIG.issuer}
    redirect_uri={CONFIG.redirect_uri}
    client_id={CONFIG.client_id}
    onAuthRequired={onAuthRequired}
  >
    <Switch>
      <Route exact path='/' component={Products} />
      <Route exact path='/details/:url' component={Product} />
      <SecureRoute exact path='/add' component={AddProduct} />
      <SecureRoute exact path='/all' component={ProductsList} />
      <SecureRoute exact path='/orders' component={Orders} />
      <Route path='/login' render={() => <Login baseUrl={CONFIG.baseUrl} />} />
      <Route path='/implicit/callback' component={ImplicitCallback} />
      <Route component={NotFound} />
    </Switch>
  </Security>
)

export default Routes
