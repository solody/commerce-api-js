import QueryString from 'querystring'

export default {
  applyForDistributor (http, agent, upstreamDistributorId) {
    let data = {
      agent: {
        name: agent.name,
        phone: agent.phone
      }
    }
    if (upstreamDistributorId) data.upstream_distributor_id = upstreamDistributorId
    return http.post('api/rest/distribution/apply-for-distributor?_format=json', data)
  },
  applyPromoter (http, promoter) {
    return http.post('api/rest/distribution/apply-promoter?_format=json', {
      distributor_id: promoter
    })
  },
  getLastPromoter (http) {
    return http.get('api/rest/distribution/last-promoter?_format=json')
  },
  computeCommissionAmount (http, data) {
    return http.post('api/rest/distribution/compute-commission-amount?_format=json', data)
  },
  uploadDistributorLogo (http, distributor, base64Data) {
    return http.post('api/rest/distribution/upload-distributor-logo/' + distributor + '?_format=json', {
      base64: base64Data
    })
  },
  updateDistributorSetting (http, distributor, setting) {
    return http.post('api/rest/distribution/update-distributor-setting/' + distributor + '?_format=json', setting)
  },
  getDistributorReport (http, distributor) {
    return http.get('api/rest/distribution/distributor-report/' + distributor + '?_format=json')
  },
  getDistributorCommissions (http, distributor, start, end) {
    let queries = {}
    if (start) {
      queries['created[min]'] = start
    }
    if (end) {
      queries['created[max]'] = end
    }
    let queriesString = QueryString.stringify(queries)
    let rqUrl = 'api/rest/views/distribution/distributor-commissions/' + distributor + '?_format=json'
    if (queriesString !== '') rqUrl += '&' + queriesString
    return http.get(rqUrl)
  }
}
