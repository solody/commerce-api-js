export default {
  add (http, data) {
    return http.post('cart/add?_format=json', data)
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
