'use strict'

const m = require('mithril')
const { pluck } = require('App/utils')

const loadRequests = (opts = {}) => {
  let params = pluck(opts, 'factory_id', 'expand')
  return m.request({
    method: 'GET',
    url: '/api/requests',
    data: params
  })
}

const fetchRequest = (requestId, opts = {}) => {
  let params = pluck(opts, 'expand')

  return m.request({
    method: 'GET',
    url: `/api/requests/${requestId}`,
    data: params
  })
}

module.exports = {
  loadRequests,
  fetchRequest
}
