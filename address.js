export default {
  getAddressOptionData (http) {
    return http.get('api/rest/address/china-simple-subdivision-list?_format=json')
  },
  addAddress (http, data) {
    return http.post('entity/profile?_format=json', {
      type: 'customer',
      ...data
    })
  },
  updateAddress (http, addressId, data) {
    return http.patch('profile/' + addressId + '?_format=json', {
      type: 'customer',
      ...data
    })
  },
  getAddress (http, addressId) {
    return http.get('profile/' + addressId + '?_format=json')
  },
  getAddressList (http, userId, status) {
    return http.get('api/rest/views/commerce-checkout-api/customer-profiles/' + userId + '?_format=json&status=' + status)
  }
}
