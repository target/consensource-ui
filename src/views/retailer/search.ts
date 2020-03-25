import * as m from 'mithril';
import * as retailerSearchService from 'App/services/retailer_search';

const _searchForm = vnode =>
    m('.form-row', [
        m(
            'div.col-10',
            m(
                `input.form-control.searchBar[type=text][name="searchFactories"][placeholder="Search by Factory Name, Certification Type or Location"]`,
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
                { onclick: () => _doSearch(vnode) },
                m('img.search-icon[src=/assets/images/search-icon.svg]'),
            ),
        ),
    ]);

const _renderRows = (items, renderer, emptyElement) => {
    if (items && items.length > 0) {
        return items.map(renderer);
    } else {
        return emptyElement;
    }
};

const _renderLocation = address => [
    address.city,
    ', ',
    address.state_province,
    !address.state_province ? '' : ', ',
    address.country,
];

function toggleFactoryDetails(vnode, index) {
    const toggle = document.querySelectorAll(`.toggle-factory-${index}`);
    toggle.forEach(t => {
        t.classList.toggle('show');
        t.classList.toggle('hide');
    });

    const details_div = document.querySelector(`#factory-details-${index}`);
    details_div.classList.toggle('view');
    details_div.classList.toggle('hide');

    const row = document.querySelector(`#factory-${index}`);
    row.classList.toggle('selected');
}

interface FactoryTable {
    factories: consensource.Factory[];
}

const FactoryTable: m.Component<FactoryTable> = {
    view: vnode => [
        m('table.table.table-bordered.factory-table', [
            m(
                'thead.thead-dark',
                m('tr', [
                    m('th[scope=col]', 'Factory Name'),
                    m('th[scope=col]', 'Certification Type(s)'),
                    m('th[scope=col]', 'Location'),
                    m('th[scope=col]', 'Details'),
                ]),
            ),
            m(
                'tbody',
                _renderRows(
                    vnode.attrs.factories,
                    (factory, index) => [
                        m(`tr.select-row.factory-info#factory-${index}`, [
                            m('td.pl-5', factory.name),
                            m('td.pl-5', _renderCertificationTypes(factory.certificates)),
                            m('td.pl-5', _renderLocation(factory.address)),
                            m(
                                `td.pl-5.toggle-factory-details`,
                                { onclick: vnode => toggleFactoryDetails(vnode, index) },
                                [
                                    m(
                                        `span.view-toggle-text.toggle-factory-${index}.show`,
                                        'View ',
                                        m('img.arrow-down[src=/assets/images/chevron-black.svg]'),
                                    ),
                                    m(
                                        `span.toggle-factory-${index}.hide`,
                                        'Hide ',
                                        m('img[src=/assets/images/chevron-black.svg]'),
                                    ),
                                ],
                            ),
                        ]),
                        m(`tr.factory-details.hide#factory-details-${index}`, _renderFactoryDetails(factory)),
                    ],
                    m('tr', m('td[colspan=5]', 'No factories found for the specified details.')),
                ),
            ),
        ]),
    ],
};
const _renderCertificationTypes = certificates => {
    const certificateTypes = certificates.map(cert => cert.standard_name);

    if (certificateTypes.length === 0) {
        return 'No Certificates Found';
    }

    const unique_types = Array.from(new Set(certificateTypes));
    return [...unique_types].map((certType, index) => `${certType}${index === unique_types.length - 1 ? '' : ', '}`);
};

const _renderFactoryDetails = factory => [
    m(
        'td.factory-details.factory-profile-link',
        m(
            m.route.Link,
            {
                selector: 'a',
                href: `/certifications/factoryProfile?factory_id=${factory.id}`,
            },
            "See this factory's profile ",
        ),
        m('img[src=/assets/images/arrow-go.svg]'),
    ),
    m('td.factory-details', ''),
    m(
        'td.factory-details',
        m('p.factory-details-subtitle', 'Current Certifications'),
        _renderCertificates(factory.certificates),
    ),
    m(
        'td.factory-details',
        m('p.factory-details-subtitle', 'Contact Information'),
        _renderContactInfo(factory.address, factory.contacts[0]),
    ),
    m('td.factory-details', ''),
];

const _renderContactInfo = (address, contact) =>
    m('span.factory-contact-info', [
        address.street_line_1,
        m('br'),
        address.street_line_2,
        !address.street_line_2 ? '' : m('br'),
        address.city,
        ', ',
        address.state_province,
        !address.state_province ? '' : ', ',
        address.postal_code,
        !address.postal_code ? '' : m('br'),
        address.country,
        m('br'),
        contact.phone_number,
        m('br'),
        m('br'),
        contact.name,
    ]);

const _renderCertificates = certData => {
    if (certData.length === 0) {
        return 'No Certificates Found';
    }
    return m('ul.list-unstyled', [certData.map(cert => m('li', cert.id))]);
};

interface SearchResultsAttrs {
    factories: consensource.Factory[];
}

interface SearchResultsState {
    selectedFactory: consensource.Factory;
}

const SearchResults: m.Component<SearchResultsAttrs, SearchResultsState> = {
    oninit: vnode => {
        vnode.attrs.factories = vnode.attrs.factories || [];
        vnode.state.selectedFactory = null;
    },
    onupdate: vnode => {
        vnode.state.selectedFactory = null;
    },
    view: vnode => [
        m(
            '.row.factory-results.mb-3',
            m(FactoryTable, {
                factories: vnode.attrs.factories,
            }),
        ),
    ],
};

const _match = (s, partial) => {
    if (s) {
        return s.toLowerCase().startsWith(partial.toLowerCase());
    } else {
        return false;
    }
};

const _doSearch = vnode => {
    const searchInput = vnode.state.value;
    const ss = vnode.state.searchSpace;
    let results = [];
    results = results.concat(ss.filter(factory => _match(factory.name, searchInput)));
    results = results.concat(ss.filter(factory => _match(factory.address.country, searchInput)));
    results = results.concat(ss.filter(factory => _match(factory.address.city, searchInput)));
    results = results.concat(ss.filter(factory => _match(factory.address.state_province, searchInput)));
    results = results.concat(ss.filter(factory => _searchCertificateId(factory.certificates, searchInput)));
    results = results.concat(ss.filter(factory => _searchStandardType(factory.certificates, searchInput)));
    const unique_results = Array.from(new Set(results).values());
    vnode.state.factories = [...unique_results];
};

const _searchCertificateId = (certificates, searchInput) =>
    Boolean(certificates.find(cert => _match(cert.id, searchInput)));

const _searchStandardType = (certificates, searchInput) =>
    Boolean(certificates.find(cert => _match(cert.standard_name, searchInput)));

interface State {
    value: string;
    factories: consensource.Factory[];
    searchSpace: consensource.Factory[];
    loading: boolean;
}

export const Certifications: m.Component<{}, State> = {
    oninit: vnode => {
        vnode.state.value = '';
        retailerSearchService.loadFactories({ expand: true }).then(factories => {
            console.log(factories);
            vnode.state.factories = factories.data;
            vnode.state.searchSpace = factories.data;
            vnode.state.loading = false;
        });
    },
    view: vnode => [
        m('.container', [
            m('.row', m('.col-8.offset-md-2', _searchForm(vnode))),
            m('.row', m('.col-10.offset-md-1.mt-5', m(SearchResults, { factories: vnode.state.factories }))),
        ]),
    ],
};
