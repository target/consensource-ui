import * as m from 'mithril';
import * as factoryService from 'App/services/factory';

interface FactoryProfileState {
    loading: boolean;
    factory: consensource.Factory;
}

const renderContactInfo = (address, contact): m.Vnode<any, any> =>
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

const renderRows = (items, renderer, emptyElement): any => {
    if (items && items.length > 0) {
        return items.map(renderer);
    } else {
        return emptyElement;
    }
};

const renderTimestamp = (timestamp): string => {
    if (timestamp) {
        const d = new Date(timestamp * 1000);
        return `${d.toLocaleDateString()}`;
    } else {
        return 'Unknown';
    }
};

const factoryProfile = (vnode): m.Vnode<any, any>[] => [
    m('span.blank-circle', m('img.factory-overview-icon[src=/assets/images/overview-icon.svg]')),
    m('.box-factory-details.pl-5.pt-4', [
        m('h5.box-factory-name', vnode.state.factory.name),
        m('p.box-factory-address', renderContactInfo(vnode.state.factory.address, vnode.state.factory.contacts[0])),
    ]),
];

const certificateTable = (vnode): m.Vnode<any, any>[] => [
    m('table.table.table-bordered.factory-table', [
        m(
            'thead.thead-dark',
            m('tr', [
                m('th[scope=col]', 'Standard'),
                m('th[scope=col]', 'Standard Version'),
                m('th[scope=col]', 'License Number'),
                m('th[scope=col]', 'Expiration Date'),
            ]),
        ),
        m(
            'tbody',
            renderRows(
                vnode.state.factory.certificates,
                (certificate, index) => [
                    m(`tr.select-row.factory-info#factory-${index}`, [
                        m('td.pl-5', certificate.standard_name),
                        m('td.pl-5', certificate.standard_version),
                        m('td.pl-5', certificate.id),
                        m('td.pl-5', renderTimestamp(certificate.valid_to)),
                    ]),
                ],
                m('tr', m('td[colspan=4]', 'No certificates found.')),
            ),
        ),
    ]),
];

export const FactoryProfile: m.Component<{}, FactoryProfileState> = {
    oninit: vnode => {
        vnode.state.loading = true;
        factoryService.fetchFactory(m.route.param('factory_id'), { expand: true }).then(factory => {
            vnode.state.factory = factory.data;
            vnode.state.loading = false;
            m.redraw();
        });
    },
    view: vnode => {
        if (vnode.state.loading) {
            return m('p', 'Loading...');
        } else {
            return [
                m('.container.mt-5', [
                    m(
                        '.row.mb-5',
                        m('.col-3', [
                            m('img[src=/assets/images/arrow-back.svg]'),
                            m(
                                m.route.Link,
                                { selector: 'a.back-link.pb-1', href: '/certifications' },
                                'Back to all certified factories',
                            ),
                        ]),
                    ),
                    m('.row', [m('.col-3', factoryProfile(vnode)), m('.col-8.mt-5', certificateTable(vnode))]),
                ]),
            ];
        }
    },
};