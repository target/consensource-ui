'use strict'

const m = require('mithril')
const agentService = require('App/services/agent')


const _renderRows = (items, renderer, emptyElement) => {
  if (items.length > 0) {
    return items.map(renderer)
  } else {
    return emptyElement
  }
}


const _searchForm = (vnode) => m('.form-row', [
      m('div.col-10',
        m(`input.form-control.searchBar[type=text][name="searchFactories"][placeholder="Search agents and organizations by name"]`, {
          oninput: m.withAttr('value', (v) => {
            vnode.state.value = v
          }),
          value: vnode.state.value
        })),
        m('div.col-2',
          m('button.btn.btn-success#searchFactory-btn',
          { onclick:() =>  _doSearch(vnode) },
          m('img.search-icon[src=/assets/images/search-icon.svg]'))
        )
    ])

const _match = (s, partial) => {
  if (s) {
    return s.toLowerCase().startsWith(partial.toLowerCase())
  } else {
    return false
  }
}

const _doSearch = (vnode) => {
  let searchInput = vnode.state.value
  let ss = vnode.state.searchSpace
  let results = []
  results = results.concat(ss.filter((agent) => _match(agent.name, searchInput)))
  results = results.concat(ss.filter((agent) => _match(agent.organization ? agent.organization.name : "", searchInput)))
  console.log(results)
  let unique_results = new Set(results)
  vnode.state.agents = [...unique_results];
}


var SearchResults = {
  _viewName: 'AgentList',
  view: (vnode) => [
    m('table.table.table-bordered.factory-table', [
      m('thead.thead-dark', m('tr', [
        m('th[scope=col]', "Organization Name"),
        m('th[scope=col]', "Agent Name"),
        m('th[scope=col]', "Contact Information"),
      ])),
      m('tbody',
        _renderRows(
          vnode.attrs.agents,
          ((agent) => m('tr', [
            m('td.pl-5', agent.organization ? agent.organization.name : 'None'),
            m('td.pl-5', agent.name),
            m('td.pl-5', agent.email),
          ])),
          m('tr', vnode.state.noRecordsElement)))
    ])
  ],

  oninit: (vnode) => {
    vnode.attrs.agents = vnode.attrs.agents || []
  }

}

const AgentList = {
  _viewName: 'AgentList',
  oninit: (vnode) => {
    vnode.state.agents = []
    vnode.state.loading = true
    vnode.state.noRecordsElement = m('td.text-center[colspan=3]', 'No Agents Found')
  },

  oncreate: (vnode) => {
    agentService.loadAgents()
      .then((agents) => {
        agents.data.sort((a, b) => a.name > b.name)
        vnode.state.agents = agents.data
        vnode.state.searchSpace = agents.data
        vnode.state.loading = false
      })
      .catch(() => {
        vnode.state.noRecordsElement =
          m('td.text-center.text-danger[colspan=3]', 'Failed to fetch Agents')
      })
  },
  view: (vnode) => [
    m('.container',
        [m('.row', m('.col-8.offset-md-2', _searchForm(vnode))),
         m('.row',  m('.col-10.offset-md-1.mt-5', m(SearchResults, { agents: vnode.state.agents })))]
      )]
}

module.exports = {
  AgentList,
}
