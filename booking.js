export default {
  checkCodes (http, data) {
    return http.post('api/rest/order-verification/check-code?_format=json', data)
  },
  createBooking (http, data) {
    return http.post('api/rest/order-verification/code-appointment?_format=json', data)
  }
}
