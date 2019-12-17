'use strict'

const m = require('mithril')
const { pluck } = require('App/utils')

const loadFactories = (opts = {}) => {
  let params = pluck(opts, 'name', 'expand')
    return m.request({
        method: 'GET',
        url: '/api/factories?expand=true',
        data: params
    })
}

module.exports = {
    loadFactories,
}
