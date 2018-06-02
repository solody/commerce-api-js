export default {
  getExpressMethods (http) {
    return http.get('api/rest/commerce-express/express-method-list?_format=json')
  }
}
