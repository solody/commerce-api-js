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
  getBookingUnitsByProduct (http, productId) {
    return http.get('api/rest/views/booking-units-by-product/' + productId + '?_format=json')
  },
  searchProduct (http, indexId, keywords, page, categories, type) {
    let urlStr = 'api/rest/commerce-product/product-search?_format=json'
    let searchOptions = {
      index_id: indexId,
      keywords: '',
      page
    }
    if (keywords && keywords !== '') {
      searchOptions.keywords = keywords
    }
    if (type && type !== '') {
      searchOptions.product_type = type
    }
    if (categories.length) {
      searchOptions.product_categories = categories
    }
    return http.post(urlStr, searchOptions)
  },
  getProductCategories (http) {
    return http.get('api/rest/views/enhanced-product/product-categories?_format=json')
  }
}
