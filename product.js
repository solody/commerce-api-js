export default {
  getProduct (http, id) {
    return http.get('api/rest/views/products/' + id + '?_format=json')
  },
  getProductVariations (http, id) {
    return http.get('api/rest/views/product-variations/' + id)
  },
  getBookingUnits (http, id) {
    return http.get('api/rest/views/booking-units/' + id)
  }
}
