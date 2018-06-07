export default {
  getMessageList (http, uid, page) {
    return http.post('api/rest/message/query-message-list?_format=json', {
      page
    })
  }
}
