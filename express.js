export default {
  getExpressMethods (http) {
    return http.get('api/rest/commerce-express/express-method-list?_format=json')
  },
  setOrderExpress (http, orderId, expressMethod) {
    return http.post('api/rest/commerce-express/set-order-express?_format=json', {
      order_id: orderId,
      express_method: expressMethod
    })
  }
}
