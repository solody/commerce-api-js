export default {
  getProductAdvertsList (http) {
    return http.get('api/rest/views/commerce/product-adverts?_format=json')
  }
}
