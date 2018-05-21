export default {
  checkCodes (http, data) {
    return http.post('api/rest/order-verification/check-code?_format=json', data)
  },
  createBooking (http, data) {
    return http.post('api/rest/order-verification/code-appointment?_format=json', data)
  },
  getBookings (http, phone, code, page) {
    let reqUrl = 'api/rest/views/aiqilv-order-verification/code-appointments?_format=json&page=' + page
    if (phone) reqUrl += '&info_phone=' + phone
    if (code) reqUrl += '&code=' + code
    return http.get(reqUrl)
  }
}
