export default {
  SmsVerify (http, phone) {
    return http.post('api/rest/phone-verify/sms-code-verify?_format=json', {phone})
  }
}
