export default {
  SmsVerify (http, phone) {
    return http.post('api/rest/phone-verify/sms-code-verify?_format=json', {phone})
  },
  smsLogin (http, clientId, phone, smsCode) {
    return http.post('api/rest/phone-login/phone-sms-login?_format=json', {
      client_id: clientId,
      phone,
      code: smsCode
    })
  }
}
