export default {
  addFavourite (http, data) {
    return http.post('entity/favourite?_format=json', data)
  },
  removeFavourite (http, favouriteId) {
    return http.delete('admin/favourite/favourite/' + favouriteId + '?_format=json')
  },
  getFavouriteList (http, userId) {
    return http.get('api/rest/views/favourite/favourites/' + userId + '?_format=json')
  }
}
