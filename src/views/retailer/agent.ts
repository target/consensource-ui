import * as m from 'mithril';
import * as agentService from 'App/services/agent';

const match = (s, partial): boolean => {
    if (s) {
        return s.toLowerCase().startsWith(partial.toLowerCase());
    } else {
        return false;
    }
};

const doSearch = (vnode): void => {
    const searchInput = vnode.state.value;
    const ss = vnode.state.searchSpace;
    let results = [];
    results = results.concat(ss.filter(agent => match(agent.name, searchInput)));
    results = results.concat(ss.filter(agent => match(agent.organization ? agent.organization.name : '', searchInput)));
    console.log(results);
    const unique_results = Array.from(new Set(results).values());
    vnode.state.agents = [...unique_results];
};

const renderRows = (items, renderer, emptyElement): any => {
    if (items.length > 0) {
        return items.map(renderer);
    } else {
        return emptyElement;
    }
};

const searchForm = (vnode): m.Vnode<any, any> =>
    m('.form-row', [
        m(
            'div.col-10',
            m(
                `input.form-control.searchBar[type=text][name="searchFactories"][placeholder="Search agents and organizations by name"]`,
                {
                    oninput: (e: any) => {
                        vnode.state.value = e.target.value;
                    },
                    value: vnode.state.value,
                },
            ),
        ),
        m(
            'div.col-2',
            m(
                'button.btn.btn-success#searchFactory-btn',
                { onclick: () => doSearch(vnode) },
                m('img.search-icon[src=/assets/images/search-icon.svg]'),
            ),
        ),
    ]);

const SearchResults = {
    view: (vnode): m.Vnode<any, any>[] => [
        m('table.table.table-bordered.factory-table', [
            m(
                'thead.thead-dark',
                m('tr', [
                    m('th[scope=col]', 'Organization Name'),
                    m('th[scope=col]', 'Agent Name'),
                    m('th[scope=col]', 'Contact Information'),
                ]),
            ),
            m(
                'tbody',
                renderRows(
                    vnode.attrs.agents,
                    agent =>
                        m('tr', [
                            m('td.pl-5', agent.organization ? agent.organization.name : 'None'),
                            m('td.pl-5', agent.name),
                            m('td.pl-5', agent.email),
                        ]),
                    m('tr', vnode.state.noRecordsElement),
                ),
            ),
        ]),
    ],

    oninit: (vnode): void => {
        vnode.attrs.agents = vnode.attrs.agents || [];
    },
};

export const AgentList = {
    oninit: (vnode): void => {
        vnode.state.agents = [];
        vnode.state.loading = true;
        vnode.state.noRecordsElement = m('td.text-center[colspan=3]', 'No Agents Found');
    },

    oncreate: (vnode): void => {
        agentService
            .loadAgents()
            .then(agents => {
                agents.data.sort((a, b) => a.name > b.name);
                vnode.state.agents = agents.data;
                vnode.state.searchSpace = agents.data;
                vnode.state.loading = false;
            })
            .catch(() => {
                vnode.state.noRecordsElement = m('td.text-center.text-danger[colspan=3]', 'Failed to fetch Agents');
            });
    },
    view: (vnode): m.Vnode<any, any>[] => [
        m('.container', [
            m('.row', m('.col-8.offset-md-2', searchForm(vnode))),
            m('.row', m('.col-10.offset-md-1.mt-5', m(SearchResults, { agents: vnode.state.agents }))),
        ]),
    ],
};
