export default {
  createAlipayPayment (http, gateway, cartId) {
    return http.post('api/rest/alipay/payment?_format=json', {
      gateway,
      cart_id: cartId
    })
  }
}
