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
  }
}
