'use strict'

const m = require('mithril')
const blockService = require('App/services/block')
const factoryService = require('App/services/factory')
const organizationService = require('App/services/organization')

const _renderRows = (items, renderer, emptyElement) => {
    if (items.length > 0) {
        return items.map(renderer)
    } else {
        return emptyElement
    }
}

const _loadFactories = (vnode) =>
  factoryService.loadFactories()
      .then((factories) => {
          vnode.state.factories = factories.data
          vnode.state.loading = false
      })
      .catch(() => {
          vnode.state.noRecordsElement =
              m('td.text-center.text-danger[colspan=9]', 'Failed to fetch factories')
      })

var FactoryList = {
    _viewName: 'FactoryList',
    view: (vnode) => [
        m('table.table.table-bordered.auditor-table', [
            m('thead.thead-dark', m('tr', [
                m('th[scope=col]', "Name"),
                m('th[scope=col]', "Address"),
                m('th[scope=col]', "City"),
                m('th[scope=col]', "State or Province"),
                m('th[scope=col]', "Country"),
                m('th[scope=col]', "Postal Code"),
                m('th[scope=col]', "Contact Name"),
                m('th[scope=col]', "Contact Phone Number"),
                m('th[scope=col]', "Contact Language Code"),
            ])),
            m('tbody',
                _renderRows(
                    vnode.state.factories,
                    ((factory) => m('tr', [
                        m('td.pl-5', factory.name),
                        m('td.pl-5', factory.address.street_line_1),
                        m('td.pl-5', factory.address.city),
                        m('td.pl-5', factory.address.state_province),
                        m('td.pl-5', factory.address.country),
                        m('td.pl-5', factory.address.postal_code),
                        m('td.pl-5', factory.contacts[0].name),
                        m('td.pl-5', factory.contacts[0].phone_number),
                        m('td.pl-5', organizationService.languageLabel(factory.contacts[0].language_code)),
                    ])),
                    m('tr', vnode.state.noRecordsElement)))
        ])
    ],

    oninit: (vnode) => {
        vnode.state.factories = []
        vnode.state.loading = true
        vnode.state.noRecordsElement = m('td.text-center[colspan=9]', 'No factories found')
    },

    oncreate: (vnode) => {
      _loadFactories(vnode)
      vnode.state._listener = () => _loadFactories(vnode)
      blockService.addBlockUpdateListener(vnode.state._listener)
    },

    onremove: (vnode) => {
      blockService.removeBlockUpdateListener(vnode.state._listener)
    }
}

module.exports = {
    FactoryList,
}
