export default {
  getSlideAds (http) {
    return http.get('api/rest/views/slide-ads?_format=json')
  }
}
