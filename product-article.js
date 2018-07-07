export default {
  getList (http, category, page) {
    return http.get('api/rest/views/product-article/list/' + category + '?_format=json&page=' + page)
  },
  getArticle (http, articleId) {
    return http.get('admin/commerce/product_article/' + articleId + '?_format=json')
  }
}
