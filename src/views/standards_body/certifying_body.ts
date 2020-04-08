import * as m from 'mithril';
import * as organizationService from 'App/services/organization';
import * as blockService from 'App/services/block';

interface State {
    certifyingBodies: consensource.CertifyingBody[];
    noRecordsElement: m.Vnode;
    loading: boolean;
    _listener: () => void;
}

const renderRows = (items, renderer, emptyElement): any => {
    if (items.length > 0) {
        return items.map(renderer);
    } else {
        return emptyElement;
    }
};

const loadCertifyingBodies = (vnode): void => {
    organizationService
        .loadOrganizations({ organization_type: 1 })
        .then(certifyingBodies => {
            certifyingBodies.data.sort((a, b) => a.name > b.name);
            vnode.state.certifyingBodies = certifyingBodies.data;
            vnode.state.loading = false;
        })
        .catch(() => {
            vnode.state.noRecordsElement = m(
                'td.text-center.text-danger[colspan=6]',
                'Failed to fetch Certifying Bodies',
            );
        });
};

export const CertifyingBodyList: m.Component<{}, State> = {
    view: vnode => [
        m('table.table', [
            m(
                'thead.thead-dark',
                m('tr', [
                    m('th[scope=col]', 'Organization ID'),
                    m('th[scope=col]', 'Organization Name'),
                    m('th[scope=col]', ''),
                ]),
            ),
            m(
                'tbody',
                renderRows(
                    vnode.state.certifyingBodies,
                    certifyingBody =>
                        m('tr', [
                            m('td', certifyingBody.id),
                            m('td', certifyingBody.name),
                            m(
                                'td',
                                m(
                                    m.route.Link,
                                    {
                                        selector: 'button.btn.btn-success.btn-sm',
                                        href: `/accreditCertifyingBody?organization_id=${certifyingBody.id}`,
                                    },
                                    'Accredit',
                                ),
                            ),
                        ]),
                    m('tr', vnode.state.noRecordsElement),
                ),
            ),
        ]),
    ],

    oninit: (vnode): void => {
        vnode.state.certifyingBodies = [];
        vnode.state.loading = true;
        vnode.state.noRecordsElement = m('td.text-center[colspan=6]', 'No Certifying Bodies Found');
    },

    oncreate: (vnode): void => {
        loadCertifyingBodies(vnode);
        vnode.state._listener = (): void => loadCertifyingBodies(vnode);
        blockService.addBlockUpdateListener(vnode.state._listener);
    },

    onremove: (vnode): void => {
        blockService.removeBlockUpdateListener(vnode.state._listener);
    },
};
