import querystring from 'querystring'
import Config from '../config'
import * as Cookies from 'tiny-cookie'

export default {
  getNewOauth2Token (http, oneTimeToken) {
    console.log('正在创建access_token')
    return http.post('oauth/token', querystring.stringify({
      grant_type: 'one_time',
      client_id: Config.oauth2.client_id,
      client_secret: Config.oauth2.client_secret,
      one_time_token: oneTimeToken
    }))
  },
  getNewOauth2TokenByAuthCode (http, AuthorizationCode) {
    console.log('正在创建access_token')
    return http.post('oauth/token', querystring.stringify({
      grant_type: 'authorization_code',
      client_id: Config.oauth2.client_id,
      client_secret: Config.oauth2.client_secret,
      code: AuthorizationCode,
      redirect_uri: ''
    }))
  },
  refreshOauth2Token (http, refreshToken) {
    console.log('正在refresh_token')
    return http.post('oauth/token', querystring.stringify({
      grant_type: 'refresh_token',
      client_id: Config.oauth2.client_id,
      client_secret: Config.oauth2.client_secret,
      refresh_token: refreshToken
    }))
  },
  checkOauth2Token (http, onRefreshTokenExpires) {
    // 检查Oauth2 token 是否过期，过期则刷新
    return new Promise((resolve, reject) => {
      let now = Math.round(new Date().getTime() / 1000)
      let expiresTime = parseInt(Cookies.get('oauth2.create_time')) + parseInt(Cookies.get('oauth2.expires_in'))
      // 提前3秒处理过期
      if ((now + 3) >= expiresTime) {
        this.refreshOauth2Token(http, Cookies.get('oauth2.refresh_token'))
          .then((res) => {
            if (res.status === 200) {
              this.setOauth2Cookies(res.data)
              resolve('Refreshed')
            } else {
              console.log('refresh_token请求出错了！')
            }
          }).catch((error) => {
            if (error.response.status === 401 && error.response.data.error === 'invalid_request') {
              console.log('refresh_token过期！')
              this.removeOauthCookies()
              onRefreshTokenExpires()
            }
          })
      } else {
        resolve('No need update')
      }
    })
  },
  setOauth2Cookies (data) {
    Cookies.set('oauth2.access_token', data.access_token, { expires: '1M' })
    Cookies.set('oauth2.expires_in', data.expires_in, { expires: '1M' })
    Cookies.set('oauth2.refresh_token', data.refresh_token, { expires: '1M' })
    Cookies.set('oauth2.token_type', data.token_type, { expires: '1M' })
    Cookies.set('oauth2.create_time', Math.round(new Date().getTime() / 1000), { expires: '1M' })
  },
  haveOauthToken () {
    if (Cookies.get('oauth2.access_token')) {
      return true
    } else {
      return false
    }
  },
  removeOauthCookies () {
    Cookies.remove('oauth2.access_token')
    Cookies.remove('oauth2.expires_in')
    Cookies.remove('oauth2.refresh_token')
    Cookies.remove('oauth2.token_type')
    Cookies.remove('oauth2.create_time')
  },
  redirectToAuthServer () {
    // 记录路由
    // 如果是微信中打开，跳转到服务器进行微信登录
    let wechatLoginUrl = 'http://' + Config.server + '/user/login/wechat'
    window.location.href = wechatLoginUrl
    // 在微信调试工具中，无法识别 ua
    let ua = window.navigator.userAgent.toLowerCase()
    if (ua.match(/MicroMessenger/i) === 'micromessenger') {
      // 跳转到微信授权页面
      window.location.href = wechatLoginUrl
    } else {
      console.log('请在微信中打开页面。')
    }
  },
  getAuthorizationHeaderValue () {
    return Cookies.get('oauth2.token_type') + ' ' + Cookies.get('oauth2.access_token')
  }
}
