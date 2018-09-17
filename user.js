export default {
  getUserInfo (http) {
    return http.get('api/rest/user-api/user-info?_format=json&time=' + Math.round(new Date().getTime() / 1000))
  },
  uploadAvatar (http, userId, data) {
    return http.post('api/rest/user-api/upload-avatar/' + userId + '?_format=json', {
      base64: data
    })
  },
  resetPassword (http, userId, data) {
    return http.post('api/rest/user-api/reset-password/' + userId + '?_format=json', data)
  },
  updateUserProfile (http, userId, data) {
    return http.patch('api/rest/enhanced-user/user-profile/' + userId + '?_format=json', data)
  },
  bindPhone (http, data) {
    return http.post('api/rest/phone-login/bind-phone?_format=json', data)
  }
}
