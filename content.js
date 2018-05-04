export default {
  getNode (http, id) {
    return http.get('node/' + id + '?_format=json')
  }
}
