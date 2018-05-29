export default {
  getCarts (http) {
    return http.get('cart?_format=json')
  },
  add (http, data) {
    return http.post('cart/add?_format=json', data)
  },
  clear (http, cart) {
    return http.delete('cart/' + cart + '/items?_format=json')
  },
  removeCartItem (http, cartId, carItemId) {
    return http.delete('/cart/' + cartId + '/items/' + carItemId + '?_format=json')
  },
  updateCartItem (http, cartId, carItemId, quantity) {
    return http.patch('/cart/' + cartId + '/items/' + carItemId + '?_format=json', {quantity})
  },
  updateCartItems (http, cartId, data) {
    return http.patch('/cart/' + cartId + '/items?_format=json', data)
  },
  getCompleteOrder (http, id) {
    return http.get('api/rest/checkout/complete-order/' + id + '?_format=json')
  },
  updateCompleteOrder (http, id, data) {
    return http.patch('api/rest/checkout/complete-order/' + id + '?_format=json', data)
  },
  createPayment (http, id, data) {
    return http.post('api/rest/checkout/complete-order/' + id + '/payment?_format=json', data)
  }
}
