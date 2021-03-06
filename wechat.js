import QueryString from 'querystring'
import Url from 'url'

export default {
  isWechat () {
    return window.navigator.userAgent.toLowerCase().indexOf('micromessenger') !== -1
  },
  authorizeRedirect (appId, redirectPath, scope) {
    let endpoint = 'https://open.weixin.qq.com/connect/oauth2/authorize'
    let defaultScope = 'snsapi_userinfo'
    if (scope) defaultScope = scope

    let currentUrl = Url.parse(window.location.href)
    let queryString = QueryString.stringify({
      appid: appId,
      redirect_uri: currentUrl.protocol + '//' + currentUrl.host + '/',
      response_type: 'code',
      scope: defaultScope,
      state: redirectPath
    })
    window.location.href = endpoint + '?' + queryString + '#wechat_redirect'
  },
  handleAuthorizationCodeRedirect (next) {
    let currentUrl = Url.parse(window.location.href)
    let query = QueryString.parse(currentUrl.query)
    if (query.code && query.state) {
      window.history.replaceState(null, null, currentUrl.protocol + '//' + currentUrl.host + '/' + currentUrl.hash)
      next({path: query.state + '/wechat/' + query.code, replace: true})
      return true
    } else {
      return false
    }
  },
  connectDrupal (http, clientId, appId, authCode) {
    return http.post('api/rest/wechat_connect/connect?_format=json', {
      client_id: clientId,
      app_id: appId,
      code: authCode
    })
  },
  registerDrupal (http, clientId, appId, openId, phone) {
    return http.post('api/rest/wechat_connect/register?_format=json', {
      client_id: clientId,
      app_id: appId,
      open_id: openId,
      phone
    })
  },
  createWechatPayment (http, gateway, cartId) {
    return http.post('api/rest/wechat-pay/wechat-payment?_format=json', {
      gateway,
      cart_id: cartId
    })
  },
  launchMediaPlatformWechatPay (config, callback) {
    let onBridgeReady = function () {
      WeixinJSBridge.invoke( // eslint-disable-line
        'getBrandWCPayRequest', {
          'appId': config.appId,
          'timeStamp': config.timeStamp,
          'nonceStr': config.nonceStr,
          'package': config.package,
          'signType': config.signType,
          'paySign': config.paySign
        },
        callback
      )
    }
    if (typeof WeixinJSBridge === 'undefined') {
      if (document.addEventListener) {
        document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false)
      } else if (document.attachEvent) {
        document.attachEvent('WeixinJSBridgeReady', onBridgeReady)
        document.attachEvent('onWeixinJSBridgeReady', onBridgeReady)
      }
    } else {
      onBridgeReady()
    }
  },
  getJSSDKConfig (http, appId, url, APIs) {
    return http.post('api/rest/wechat_connect/js-sdk-config?_format=json', {
      app_id: appId,
      url,
      apis: APIs
    })
  }
}
