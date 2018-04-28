export default {
  checkCodes (http, data) {
    return http.post('api/rest/order-verification/check-code', data)
  },
  createBooking (http, data) {
    return http.post('api/rest/order-verification/code-appointment', data)
  }
}
