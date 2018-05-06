import QueryString from 'querystring'

export default {
  getWithdraws (http, userId, start, end) {
    let queries = {}
    if (start) {
      queries['created[min]'] = start
    }
    if (end) {
      queries['created[max]'] = end
    }
    let queriesString = QueryString.stringify(queries)
    let rqUrl = 'api/rest/views/finance/withdraws/' + userId + '?_format=json'
    if (queriesString !== '') rqUrl += '&' + queriesString
    return http.get(rqUrl)
  }
}
