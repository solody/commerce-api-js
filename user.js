export default {
  getUserInfo (http) {
    return http.get('api/rest/user-api/user-info?_format=json')
  }
}
