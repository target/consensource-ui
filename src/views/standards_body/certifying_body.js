'use strict'

const m = require('mithril')
const organizationService = require('App/services/organization')
const blockService = require('App/services/block')

const _renderRows = (items, renderer, emptyElement) => {
  if (items.length > 0) {
    return items.map(renderer)
  } else {
    return emptyElement
  }
}

const _loadCertifyingBodies = (vnode) => {
  organizationService.loadOrganizations({'organization_type': 1})
    .then((certifyingBodies) => {
      certifyingBodies.data.sort((a,b) => a.name > b.name)
      vnode.state.certifyingBodies = certifyingBodies.data
      vnode.state.loading = false
    })
    .catch(() => {
      vnode.state.noRecordsElement =
        m('td.text-center.text-danger[colspan=6]', 'Failed to fetch Certifying Bodies')
    })
}

var CertifyingBodyList = {
    _viewName: 'CertifyingBodyList',
    view: (vnode) => [
        m('table.table', [
            m('thead.thead-dark', m('tr', [
                m('th[scope=col]', "Organization ID"),
                m('th[scope=col]', "Organization Name"),
                m('th[scope=col]', "")
            ])),
            m('tbody',
                _renderRows(
                    vnode.state.certifyingBodies,
                    ((certifyingBody) => m('tr', [
                        m('td', certifyingBody.id),
                        m('td', certifyingBody.name),
                        m('td', m(`button.btn.btn-success.btn-sm[href=/accreditCertifyingBody?organization_id=${certifyingBody.id}]`,
                            {oncreate: m.route.link}, "Accredit"))
                    ])),
                    m('tr', vnode.state.noRecordsElement)))
        ])
    ],

    oninit: (vnode) => {
        vnode.state.certifyingBodies = []
        vnode.state.loading = true
        vnode.state.noRecordsElement = m('td.text-center[colspan=6]', 'No Certifying Bodies Found')
    },

    oncreate: (vnode) => {
        _loadCertifyingBodies(vnode)
        vnode.state._listener = () => _loadCertifyingBodies(vnode)
        blockService.addBlockUpdateListener(vnode.state._listener)
    },

    onremove: (vnode) => {
        blockService.removeBlockUpdateListener(vnode.state._listener)
    }
}

module.exports = {
    CertifyingBodyList,
}
