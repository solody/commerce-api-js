export default {
  getProduct (http, id) {
    return http.get('api/rest/views/products/' + id + '?_format=json')
  },
  getProductVariations (http, id) {
    return http.get('api/rest/views/product-variations/' + id + '?_format=json')
  },
  getBookingUnits (http, id) {
    return http.get('api/rest/views/booking-units/' + id + '?_format=json')
  },
  searchProduct (http, keywords, type, page) {
    return http.get('api/rest/views/product-search?_format=json&search_api_fulltext=' + keywords + '&page=' + page + '&type=' + type)
  }
}
