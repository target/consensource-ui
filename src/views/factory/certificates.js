'use strict'

const m = require('mithril')
const blockService = require('App/services/block')
const certificateService = require('App/services/certificate')


const _renderRows = (items, renderer, emptyElement) => {
    if (items.length > 0) {
        return items.map(renderer)
    } else {
        return emptyElement
    }
}

const _loadCertificates = (vnode) =>
  certificateService.loadCertificates({"factory_id": vnode.attrs.factory.id})
      .then((certificates) => {
          vnode.state.certificates = certificates.data
          vnode.state.loading = false
      })
      .catch(() => {
          vnode.state.noRecordsElement =
              m('td.text-center.text-danger[colspan=6]', 'Failed to fetch Certificates')
      })

var CertificateList = {
    _viewName: 'CertificateList',
    view: (vnode) => [
        m('p.request-title', 'Current Certifications'),
        m('table.table.table-bordered', [
            m('thead.thead-dark', m('tr', [
                m('th[scope=col]', "Certificate Issuer"),
                m('th[scope=col]', "Standard"),
                m('th[scope=col]', "Standard Version"),
                m('th[scope=col]', "License Number"),
                m('th[scope=col]', "Valid from"),
                m('th[scope=col]', "Valid to"),
            ])),
            m('tbody',
                _renderRows(
                    vnode.state.certificates,
                    ((certificate) => m('tr', [
                        m('td', certificate.certifying_body),
                        m('td', certificate.standard_name),
                        m('td', certificate.standard_version),
                        m('td', certificate.id),
                        m('td', _renderTimestamp(certificate.valid_from)),
                        m('td', _renderTimestamp(certificate.valid_to)),
                    ])),
                    m('tr', vnode.state.noRecordsElement)))
        ])
    ],

    oninit: (vnode) => {
        vnode.state.certificates = []
        vnode.state.loading = true
        vnode.state.noRecordsElement = m('td.text-center[colspan=6]', 'No Certificates Found')
    },

    oncreate: (vnode) => {
      _loadCertificates(vnode)
      vnode.state._listener = () => _loadCertificates(vnode)
      blockService.addBlockUpdateListener(vnode.state._listener)
    },

    onremove: (vnode) => {
      blockService.removeBlockUpdateListener(vnode.state._listener)
    },
}

const _renderTimestamp = (timestamp) => {
  if (timestamp) {
    let d = new Date(timestamp * 1000)
    return `${d.toLocaleDateString()}`
  } else {
    return 'Unknown'
  }
}

module.exports = {
  CertificateList
}
