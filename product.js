export default {
  getProduct (http, id) {
    return http.get('api/rest/views/products/' + id)
  },
  getProductVariations (http, id) {
    return http.get('api/rest/views/product-variations/' + id)
  },
  getBookingUnits (http, id) {
    return http.get('api/rest/views/booking-units/' + id)
  }
}
