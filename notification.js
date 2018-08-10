export default {
  getUserSetting (http) {
    return http.get('api/rest/message-auto-notify/user-notify-setting?_format=json&time' + Date.parse(new Date()))
  },
  modifyUserSetting (http, data) {
    return http.patch('api/rest/message-auto-notify/user-notify-setting?_format=json', data)
  }
}
