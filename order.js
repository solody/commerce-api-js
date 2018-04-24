export default {
  getList (http, userId, page) {
    return http.get('api/rest/views/orders/' + userId + '?_format=json&page=' + page)
  }
}
