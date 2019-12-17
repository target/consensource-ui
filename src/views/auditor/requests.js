'use strict'

const m = require('mithril')
const requestService = require('App/services/requests')
const blockService = require('App/services/block')

const _renderRows = (items, renderer, emptyElement) => {
  if (items.length > 0) {
    return items.map(renderer)
  } else {
    return emptyElement
  }
}

const _renderRequestStatus = (status) => {
  switch (status) {
    case "InProgress":
      return "In Progress"
    case "UnsetStatus":
      return "Unset Status"
    default:
      return status
  }
}

const _loadRequests = (vnode) => {
  requestService.loadRequests({expand: true})
    .then((requests) => {
      vnode.state.requests = requests.data
      vnode.state.loading = false
    })
    .catch(() => {
      vnode.state.noRecordsElement =
        m('td.text-center.text-danger[colspan=6]', 'Failed to fetch Requests')
    })
}

const _renderTimestamp = (unixTimestamp) => {
  if (unixTimestamp) {
    let d = new Date(unixTimestamp * 1000)
    return `${d.toLocaleDateString()}`
  } else {
    return 'Unknown'
  }
}


var RequestList = {
  _viewName: 'RequestList',
  view: (vnode) => [
    m('table.table.table-boredered.auditor-table', [
      m('thead.thead-dark', m('tr', [
        m('th[scope=col]', "Factory Name"),
        m('th[scope=col]', "Request Date"),
        m('th[scope=col]', "Standard"),
        m('th[scope=col]', "Contact Name"),
        m('th[scope=col]', "Phone Number"),
        m('th[scope=col]', "Status"),
        m('th[scope=col]', "Certification Decision")
      ])),
      m('tbody',
        _renderRows(
          vnode.state.requests,
          ((request) => m('tr', [
            m('td.pl-5', request.factory.name),
            m('td.pl-5', _renderTimestamp(request.request_date)),
            m('td.pl-5', request.standard.name),
            m('td.pl-5', request.factory.contacts[0].name),
            m('td.pl-5', request.factory.contacts[0].phone_number),
            m('td.pl-5', _renderRequestStatus(request.status)),
            m('td.pl-5', m(`button.btn.btn-success.btn-sm#auditor-btn[href=/certificateCreate?request_id=${request.id}]`,
              {oncreate: m.route.link,
              disabled: !(request.status === "InProgress")}, "Certify"))
          ])),
          m('tr', vnode.state.noRecordsElement)))
    ])
  ],

  oninit: (vnode) => {
    vnode.state.requests = []
    vnode.state.loading = true
    vnode.state.noRecordsElement = m('td.text-center[colspan=7]', 'No Requests Found')
  },

  oncreate: (vnode) => {
    _loadRequests(vnode)
    vnode.state._listener = () => _loadRequests(vnode)
    blockService.addBlockUpdateListener(vnode.state._listener)
  },

  onremove: (vnode) => {
    blockService.removeBlockUpdateListener(vnode.state._listener)
  }
}

module.exports = {
  RequestList
}
