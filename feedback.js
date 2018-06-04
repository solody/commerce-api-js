export default {
  makeFeedback (http, data) {
    return http.post('api/rest/feedback/make-feedback?_format=json', data)
  }
}
