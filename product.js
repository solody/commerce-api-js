export default {
  getProduct (http, id) {
    return http.get('api/rest/views/products/' + id + '?_format=json&status=1')
  },
  getProducts (http, page, keyword) {
    return http.get('api/rest/views/products/all?_format=json&status=1&page=' + page + '&title=' + keyword)
  },
  getProductVariations (http, id) {
    return http.get('api/rest/views/product-variations/' + id + '?_format=json')
  },
  getBookingUnits (http, id) {
    return http.get('api/rest/views/booking-units/' + id + '?_format=json')
  },
  searchProduct (http, keyword, page, type) {
    let urlStr = 'api/rest/views/product-search?_format=json&page=' + page
    if (keyword && keyword !== '') {
      urlStr = urlStr + '&search_api_fulltext=' + keyword
    }
    if (type && type !== '') {
      urlStr = urlStr + '&type=' + type
    }
    return http.get(urlStr)
  }
}
