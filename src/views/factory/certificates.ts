import * as m from 'mithril';
import * as blockService from 'App/services/block';
import * as certificateService from 'App/services/certificate';

interface Attrs {
    factory: consensource.Factory;
}

interface State {
    certificates: consensource.Certificate[];
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

const renderTimestamp = (timestamp): string => {
    if (timestamp) {
        const d = new Date(timestamp * 1000);
        return `${d.toLocaleDateString()}`;
    } else {
        return 'Unknown';
    }
};

const loadCertificates = (vnode): Promise<void> =>
    certificateService
        .loadCertificates({ factory_id: vnode.attrs.factory.id })
        .then(certificates => {
            vnode.state.certificates = certificates.data;
            vnode.state.loading = false;
        })
        .catch(() => {
            vnode.state.noRecordsElement = m('td.text-center.text-danger[colspan=6]', 'Failed to fetch Certificates');
        });

export const CertificateList: m.Component<Attrs, State> = {
    view: vnode => [
        m('p.request-title', 'Current Certifications'),
        m('table.table.table-bordered', [
            m(
                'thead.thead-dark',
                m('tr', [
                    m('th[scope=col]', 'Certificate Issuer'),
                    m('th[scope=col]', 'Standard'),
                    m('th[scope=col]', 'Standard Version'),
                    m('th[scope=col]', 'License Number'),
                    m('th[scope=col]', 'Valid from'),
                    m('th[scope=col]', 'Valid to'),
                ]),
            ),
            m(
                'tbody',
                renderRows(
                    vnode.state.certificates,
                    certificate =>
                        m('tr', [
                            m('td', certificate.certifying_body),
                            m('td', certificate.standard_name),
                            m('td', certificate.standard_version),
                            m('td', certificate.id),
                            m('td', renderTimestamp(certificate.valid_from)),
                            m('td', renderTimestamp(certificate.valid_to)),
                        ]),
                    m('tr', vnode.state.noRecordsElement),
                ),
            ),
        ]),
    ],

    oninit: vnode => {
        vnode.state.certificates = [];
        vnode.state.loading = true;
        vnode.state.noRecordsElement = m('td.text-center[colspan=6]', 'No Certificates Found');
    },

    oncreate: vnode => {
        loadCertificates(vnode);
        vnode.state._listener = (): Promise<void> => loadCertificates(vnode);
        blockService.addBlockUpdateListener(vnode.state._listener);
    },

    onremove: vnode => {
        blockService.removeBlockUpdateListener(vnode.state._listener);
    },
};
