import QueryString from 'querystring'
import Url from 'url'

export default {
  authorizeRedirect (appId, redirectPath) {
    let endpoint = 'https://open.weixin.qq.com/connect/oauth2/authorize'

    let currentUrl = Url.parse(window.location.href)
    let queryString = QueryString.stringify({
      appid: appId,
      redirect_uri: currentUrl.protocol + '//' + currentUrl.host + '/',
      response_type: 'code',
      scope: 'snsapi_userinfo',
      state: redirectPath
    })
    window.location.href = endpoint + '?' + queryString + '#wechat_redirect'
  },
  handleAuthorizationCodeRedirect (next) {
    let currentUrl = Url.parse(window.location.href)
    console.log(currentUrl)
    let query = QueryString.parse(currentUrl.query)
    if (query.code && query.state) {
      window.history.replaceState(null, null, currentUrl.protocol + '//' + currentUrl.host + '/' + currentUrl.hash)
      next(query.state + '/wechat/' + query.code)
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
  }
}
