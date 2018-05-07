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
  },
  getAccounts (http, userId) {
    return http.get('api/rest/views/finance/accounts/' + userId + '?_format=json')
  },
  getTransferMethods (http, userId) {
    return http.get('api/rest/views/finance/transfer-methods/' + userId + '?_format=json')
  },
  createTransferMethods (http, data) {
    return http.post('entity/finance_transfer_method?_format=json', data)
  },
  updateTransferMethods (http, transferMethodId, data) {
    return http.patch('admin/finance/finance_transfer_method/' + transferMethodId + '?_format=json', data)
  },
  getAccountWithdrawLimitation (http, accountId) {
    return http.get('api/rest/finance/withdraw-limitation/' + accountId + '?_format=json')
  },
  applyWithdraw (http, accountId, data) {
    return http.post('api/rest/finance/apply-withdraw/' + accountId + '?_format=json', data)
  }
}
