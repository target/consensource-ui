import * as m from 'mithril';
import AuthService from 'App/services/auth';
import * as certificateService from 'App/services/certificate';
import * as agentService from 'App/services/agent';
import * as requestService from 'App/services/requests';
import * as blockService from 'App/services/block';
import * as DatePicker from 'mithril-datepicker';

export const IssueCertificateData = {
    id: '',
    requestId: '',
    validFrom: new Date().getTime() / 1000,
    validTo: 0,
    certificateData: [],
    factoryId: '',
    submitting: false,
    errorMsg: null,

    setID: id => {
        IssueCertificateData.id = id;
    },

    setRequestId: requestId => {
        IssueCertificateData.requestId = requestId;
    },

    setValidFrom: timestamp => {
        IssueCertificateData.validFrom = timestamp;
    },

    setValidTo: timestamp => {
        IssueCertificateData.validTo = timestamp;
    },

    setCertificateDate: certificateData => {
        IssueCertificateData.certificateData = certificateData;
    },

    clear: () => {
        IssueCertificateData.factoryId = '';
        IssueCertificateData.requestId = '';
        IssueCertificateData.validFrom = new Date().getTime() / 1000;
        IssueCertificateData.validTo = 0;
        IssueCertificateData.certificateData = [];
        IssueCertificateData.submitting = false;
        IssueCertificateData.errorMsg = null;
    },

    submit: (organizationId, factoryId) => {
        IssueCertificateData.submitting = true;
        return AuthService.getSigner()
            .then(signer =>
                certificateService.issueCertificate(IssueCertificateData, organizationId, factoryId, signer),
            )
            .then(() => {
                IssueCertificateData.clear();
                m.route.set('/certificates');
            })
            .catch(errorMsg => {
                IssueCertificateData.errorMsg = errorMsg;
                IssueCertificateData.submitting = false;
                m.redraw();
            });
    },
};

interface Agent extends consensource.Agent {
    organization: consensource.Organization;
}

interface Request extends consensource.Request {
    factory: consensource.Organization;
    standard: consensource.Standard;
}

interface CertificateCreateState {
    loading: boolean;
    agent?: Agent;
    request?: Request;
}

export const CertificateCreate: m.Component<{}, CertificateCreateState> = {
    oninit: vnode => {
        IssueCertificateData.clear();
        vnode.state.loading = true;
        vnode.state.agent = null;
        vnode.state.request = null;

        return AuthService.getUserData().then((user: any) =>
            Promise.all([
                agentService.fetchAgent(user.public_key),
                requestService.fetchRequest(m.route.param('request_id'), { expand: true }),
            ])
                .then(([agent, request]) => {
                    vnode.state.loading = false;
                    vnode.state.request = request.data;
                    vnode.state.agent = agent.data;
                    m.redraw();
                })
                .catch(e => {
                    console.log(e);
                    vnode.state.loading = false;
                }),
        );
    },
    view: vnode => {
        if (vnode.state.loading) {
            return m('p', 'Loading...');
        } else if (vnode.state.agent) {
            DatePicker.localize({
                weekStart: 1,
                prevNextTitles: ['1M', '1A', '10A'],
                formatOptions: {
                    day: 'numeric',
                    month: 'numeric',
                    year: 'numeric',
                },
            });
            return [
                m('h6', 'Certificate Information'),
                m('div.form', [
                    IssueCertificateData.errorMsg ? m('p.text-danger', IssueCertificateData.errorMsg) : null,
                    m('div.form-group', [
                        m('div.form-group.row', [
                            m('label[for=certificateID]', 'Certificate ID'),
                            m('input.form-control[type=text]', {
                                oninput: (e: any) => IssueCertificateData.setID(e.target.value),
                                value: IssueCertificateData.id,
                            }),
                        ]),
                        m('div.form-group.row', [
                            m('div.col', [
                                m('label', 'Valid from'),
                                m(DatePicker, {
                                    onchange: chosenDate => {
                                        IssueCertificateData.setValidFrom(chosenDate.getTime() / 1000);
                                    },
                                }),
                            ]),
                            m('div.col', [
                                m('label', 'Valid to'),
                                m(DatePicker, {
                                    onchange: chosenDate => {
                                        IssueCertificateData.setValidTo(chosenDate.getTime() / 1000);
                                    },
                                }),
                            ]),
                        ]),
                        m('div.form-group', [
                            m('div.form-group.row', [
                                m('label[for=factoryName]', 'Factory'),
                                m('input.form-control-plaintext[type=text][readonly=true]', {
                                    value: vnode.state.request.factory.name,
                                }),
                            ]),
                            m('div.form-group.row', [
                                m('label[for=certificateStandard]', 'Standard'),
                                m('input.form-control-plaintext[type=text][readonly=true]', {
                                    value: vnode.state.request.standard.name,
                                }),
                            ]),
                        ]),
                    ]),
                    m(
                        'button.btn.btn-primary',
                        {
                            onclick: () => {
                                IssueCertificateData.setRequestId(vnode.state.request.id);
                                IssueCertificateData.submit(
                                    vnode.state.agent.organization.id,
                                    vnode.state.request.factory.id,
                                );
                            },
                            disabled: IssueCertificateData.submitting,
                        },
                        'Issue Certificate',
                    ),
                ]),
            ];
        } else {
            return [m('p', 'Unable to load details')];
        }
    },
};

const _renderRows = (items, renderer, emptyElement) => {
    if (items.length > 0) {
        return items.map(renderer);
    } else {
        return emptyElement;
    }
};

const _loadCertificates = vnode =>
    certificateService
        .loadCertificates()
        .then(certificates => {
            vnode.state.certificates = certificates.data;
            vnode.state.loading = false;
        })
        .catch(() => {
            vnode.state.noRecordsElement = m('td.text-center.text-danger[colspan=6]', 'Failed to fetch Certificates');
        });

interface CertificateListState {
    certificates: consensource.Certificate[];
    loading: boolean;
    noRecordsElement: m.Vnode;
    _listener: () => void;
}

export const CertificateList: m.Component<{}, CertificateListState> = {
    view: vnode => [
        m('table.table.table-bordered.auditor-table', [
            m(
                'thead.thead-dark',
                m('tr', [
                    m('th[scope=col]', 'Certificate ID'),
                    m('th[scope=col]', 'Certifying Body'),
                    m('th[scope=col]', 'Factory'),
                    m('th[scope=col]', 'Standard'),
                    m('th[scope=col]', 'Valid from'),
                    m('th[scope=col]', 'Valid to'),
                ]),
            ),
            m(
                'tbody',
                _renderRows(
                    vnode.state.certificates,
                    certificate =>
                        m('tr', [
                            m('td.pl-5', certificate.id),
                            m('td.pl-5', certificate.certifying_body),
                            m('td.pl-5', certificate.factory_name),
                            m('td.pl-5', certificate.standard_name),
                            m('td.pl-5', _renderTimestamp(certificate.valid_from)),
                            m('td.pl-5', _renderTimestamp(certificate.valid_to)),
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
        _loadCertificates(vnode);
        vnode.state._listener = () => _loadCertificates(vnode);
        blockService.addBlockUpdateListener(vnode.state._listener);
    },

    onremove: vnode => {
        blockService.removeBlockUpdateListener(vnode.state._listener);
    },
};

const _renderTimestamp = timestamp => {
    if (timestamp) {
        const d = new Date(timestamp * 1000);
        return `${d.toLocaleDateString()}`;
    } else {
        return 'Unknown';
    }
};
