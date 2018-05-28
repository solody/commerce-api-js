export default {
  getPromotionList (http, status) {
    return http.get('api/rest/views/commerce-promotion/promotions?_format=json&status=' + status)
  },
  receiveCoupon (http, promotionId, userId) {
    return http.post('api/rest/commerce-promotion/receive-coupon?_format=json', {
      promotion: promotionId,
      user: userId
    })
  },
  getCoupons (http, userId) {
    return http.get('api/rest/views/commerce-promotion/coupons/' + userId + '?_format=json&status=' + status)
  },
  couponRedemption (http, couponId, cartId) {
    return http.post('api/rest/commerce-promotion/coupon-redemption?_format=json', {
      coupon: couponId,
      cart: cartId
    })
  }
}
