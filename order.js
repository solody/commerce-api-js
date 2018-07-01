export default {
  getList (http, userId, page, phone) {
    let reqUrl = 'api/rest/views/orders/' + userId + '?_format=json&page=' + page
    if (phone) reqUrl += '&field_phone_value=' + phone
    return http.get(reqUrl)
  },
  getListByStatus (http, userId, page, state) {
    let reqUrl = 'api/rest/views/orders/' + userId + '?_format=json&page=' + page
    if (state && state !== 'all') reqUrl += '&state=' + state
    return http.get(reqUrl)
  },
  getOrder (http, orderId) {
    return http.get('admin/commerce/orders/' + orderId + '?_format=json')
  },
  setOrderBillingProfile (http, orderId, billingProfile) {
    return http.post('api/rest/commerce-order/set-order-billing-profile?_format=json', {
      order_id: orderId,
      billing_profile: billingProfile
    })
  }
}
