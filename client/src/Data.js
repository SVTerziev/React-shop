const getOrders = async token => {
  const response = await fetch('http://localhost/orders', {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: 'Bearer ' + await token
    }
  })
  const orders = await response.json()
  const { finished, unfinished } = orders
  const all = [...finished, ...unfinished]

  return {
    all,
    finished,
    unfinished
  }
}

const getProducts = async token => {
  const response = await fetch('http://localhost/products', {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: 'Bearer ' + await token
    }
  })
  const products = await response.json()

  return products
}

export { getOrders, getProducts }
