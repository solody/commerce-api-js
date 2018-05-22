export default {
  getList (http, userId, page, phone) {
    let reqUrl = 'api/rest/views/orders/' + userId + '?_format=json&page=' + page
    if (phone) reqUrl += '&field_phone_value=' + phone
    return http.get(reqUrl)
  }
}
