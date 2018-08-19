import QueryString from 'querystring'
import Url from 'url'
import * as Cookies from 'tiny-cookie'

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
  getDistributorCommissions (http, distributor, start, end, page) {
    let queries = {
      page
    }
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
  },
  getPromotedOrders (http, distributor, start, end, state, keyword, page) {
    let params = {
      distributor,
      page: page
    }
    if (start && end) {
      params.time_start = start
      params.time_end = end
    }
    if (state) params.state = state
    if (keyword) params.keyword = keyword

    return http.post('api/rest/aiqilv-distribution/distributor-orders?_format=json', params)
  },
  handlePromoterQueryValue () {
    let currentUrl = Url.parse(window.location.href)
    if (QueryString.parse(currentUrl.query).promoter) {
      console.log('setting promoter cookies!')
      Cookies.set('user.promoter', QueryString.parse(currentUrl.query).promoter)
      // 去掉url中的参数
      let queryObject = QueryString.parse(currentUrl.query)
      delete queryObject.promoter

      let qsValue = QueryString.stringify(queryObject) === '' ? '' : '?' + QueryString.stringify(queryObject)
      let newUrl = currentUrl.protocol + '//' + currentUrl.host + '/' + qsValue + currentUrl.hash

      window.history.replaceState(null, null, newUrl)
      return true
    } else {
      return false
    }
  },
  queryDownstreamDistributors (http, distributor, page) {
    let params = {
      distributor,
      page
    }
    return http.post('api/rest/distribution/query-downstream-distributors?_format=json', params)
  }
}
