import * as m from 'mithril';
import AuthService from 'App/services/auth';
import * as blockService from 'App/services/block';
import * as certRequestService from 'App/services/certificate_request';
import * as standardService from 'App/services/standards';
import { Request as RequestProto } from 'App/protobuf';
import * as agentService from 'App/services/agent';
import * as factoryService from 'App/services/factory';
import { CertificateList } from 'App/views/factory/certificates';

interface State {
    certRequests: consensource.Request[];
    loading: boolean;
    user: any;
    factory: consensource.Factory;
}

const CertificateRequest = {
    requestId: '',
    status: 0,
    standardId: '',
    factoryId: '',
    requestDate: 0,

    submitting: false,
    closing: false,
    inProgress: false,
    errorMsg: null,

    setStandardId: (standardId): void => {
        CertificateRequest.standardId = standardId;
    },

    initialize: (factory): void => {
        CertificateRequest.factoryId = factory.id;
    },

    clear: (): void => {
        CertificateRequest.submitting = false;
        CertificateRequest.closing = false;
        CertificateRequest.inProgress = false;
        CertificateRequest.errorMsg = null;
        CertificateRequest.requestId = '';
        CertificateRequest.status = 0;
        CertificateRequest.standardId = '';
        CertificateRequest.factoryId = '';
        CertificateRequest.requestDate = 0;
    },

    submit: (): Promise<void> => {
        CertificateRequest.submitting = true;
        CertificateRequest.requestDate = new Date().getTime() / 1000;
        return AuthService.getSigner()
            .then(signer => certRequestService.openCertificateRequest(CertificateRequest, signer))
            .then(() => {
                CertificateRequest.clear();
            })
            .catch(e => {
                console.error(e);
                CertificateRequest.submitting = false;
                CertificateRequest.errorMsg = e;
                m.redraw();
            });
    },

    close: (requestId): Promise<void> => {
        CertificateRequest.closing = true;
        CertificateRequest.requestId = requestId;
        CertificateRequest.status = RequestProto.Status.CLOSED;
        return AuthService.getSigner()
            .then(signer => certRequestService.changeCertificateRequest(CertificateRequest, signer))
            .then(() => {
                CertificateRequest.clear();
            })
            .catch(e => {
                console.error(e);
                CertificateRequest.closing = false;
                CertificateRequest.errorMsg = e;
                m.redraw();
            });
    },

    putInProgress: (requestId): Promise<void> => {
        CertificateRequest.inProgress = true;
        CertificateRequest.requestId = requestId;
        CertificateRequest.status = RequestProto.Status.IN_PROGRESS;
        return AuthService.getSigner()
            .then(signer => certRequestService.changeCertificateRequest(CertificateRequest, signer))
            .then(() => {
                CertificateRequest.clear();
            })
            .catch(e => {
                console.error(e);
                CertificateRequest.inProgress = false;
                CertificateRequest.errorMsg = e;
                m.redraw();
            });
    },
};

const CertificationStandards = {
    list: [],
    get: (): void => {
        standardService.listStandards().then(standards => {
            standards.data.map(standard =>
                CertificationStandards.list.push(
                    m('option', {
                        value: standard.standard_id,
                        text: standard.standard_name,
                    }),
                ),
            );
        });
    },
};

const putInProgress = (requestId): Promise<void> => CertificateRequest.putInProgress(requestId);

const close = (requestId): Promise<void> => CertificateRequest.close(requestId);

const formatDate = (requestDate): string => {
    // Convert back to milli
    const currentdate = new Date(requestDate * 1000);
    const date = currentdate.getDate();
    const month = currentdate.getMonth() + 1;
    const year = currentdate.getFullYear();
    return `${month}-${date}-${year}`;
};

const renderRows = (items, renderer, emptyElement): any => {
    if (items.length > 0) {
        return items.map(renderer);
    } else {
        return emptyElement;
    }
};

const renderRequestStatus = (status): any => {
    switch (status) {
        case 'InProgress':
            return 'In Progress';
        case 'UnsetStatus':
            return 'Unset Status';
        default:
            return status;
    }
};

const FactoryRequestForm = {
    loadData: (vnode): Promise<void> => {
        vnode.state.loading = true;
        const { factory } = vnode.attrs;
        if (!factory) {
            return Promise.resolve();
        }

        return certRequestService
            .loadCertificateRequests({
                factory_id: factory.id,
                expand: true,
            })
            .then(requests => {
                vnode.state.loading = false;
                vnode.state.certRequests = requests.data.filter(request => request.status !== 'Closed');
                CertificateRequest.initialize(factory);
                m.redraw();
            })
            .catch(() => {
                vnode.state.loading = false;
                m.redraw();
            });
    },
    oncreate: (vnode): void => {
        vnode.state._listener = (): Promise<void> => FactoryRequestForm.loadData(vnode);
        blockService.addBlockUpdateListener(vnode.state._listener);
        FactoryRequestForm.loadData(vnode);
        CertificationStandards.get();
    },

    onremove: (vnode): void => {
        blockService.removeBlockUpdateListener(vnode.state._listener);
    },

    view: (vnode): m.Vnode<any, any>[] => {
        if (vnode.state.loading) {
            return [m('.row', 'Loading...')];
        } else if (vnode.state.certRequests) {
            return [
                m('p.request-title', 'Open Certificate Requests'),
                m(
                    'p.request-explanation',
                    'By opening a certification request, you are indicating that you have or will have arranged for an audit of your premises. ' +
                        'An auditor will review your request and respond by assigning a status of “Verified” or “Not Verified”. You may withdraw requests at any time.',
                ),
                m('table.table.request-table', [
                    m(
                        'thead',
                        m('tr', [
                            m('th[scope=col]', 'Request Date'),
                            m('th[scope=col]', 'Standard'),
                            m('th[scope=col]', 'Status'),
                            m('th[scope=col]', 'Actions'),
                        ]),
                    ),
                    m(
                        'tbody',
                        m(`tr.select-row.form-group`, [
                            m('td[align=center]', m('span.dash', '—')),
                            m(
                                'td.pl-5',
                                m(
                                    'select.form-control.standard-select',
                                    {
                                        oninput: (e: any) => CertificateRequest.setStandardId(e.target.value),
                                        value: CertificateRequest.standardId,
                                    },
                                    m('option[value=""][disabled="disabled"]', 'Choose Standard'),
                                    CertificationStandards.list,
                                ),
                            ),
                            m('td[align=center]', m('span.dash', '—')),
                            m(
                                'td.pl-5',
                                m(
                                    'button.btn.btn.submitRequest',
                                    {
                                        onclick: e => {
                                            e.preventDefault();
                                            CertificateRequest.submit().then(() => FactoryRequestForm.loadData(vnode));
                                        },
                                        disabled: CertificateRequest.submitting || CertificateRequest.standardId === '',
                                    },
                                    'Submit Request',
                                ),
                            ),
                        ]),
                        renderRows(
                            vnode.state.certRequests,
                            request => [
                                m(`tr.select-row`, [
                                    m('td.pl-5', formatDate(request.request_date)),
                                    m('td.pl-5', request.standard.name),
                                    m('td.pl-5', renderRequestStatus(request.status)),
                                    m('td.pl-5', renderActionButton(request.status, request.id, vnode)),
                                ]),
                            ],
                            m('tr', m('td[colspan=4]', 'No open requests found')),
                        ),
                    ),
                ]),
            ];
        } else {
            return [m('.row', 'Unable to load details')];
        }
    },
};

const renderActionButton = (status, requestId, vnode): any[] => {
    const actions = [];
    if (status === 'Open') {
        actions.push(
            m(
                'button.btn.action-btn[type=submit]',
                {
                    onclick: e => {
                        e.preventDefault();
                        putInProgress(requestId).then(() => FactoryRequestForm.loadData(vnode));
                    },
                    disabled: CertificateRequest.inProgress,
                },
                'Set In Progress',
            ),
        );
    }
    if (status !== 'Closed') {
        actions.push(
            m(
                'button.btn.action-btn.mt-1[type=submit]',
                {
                    onclick: e => {
                        e.preventDefault();
                        close(requestId).then(() => FactoryRequestForm.loadData(vnode));
                    },
                    disabled: CertificateRequest.closing,
                },
                'Withdraw Request',
            ),
        );
    }
    return actions;
};

export const ListCertifications: m.Component<{}, State> = {
    oninit: vnode => {
        vnode.state.certRequests = null;
        AuthService.getUserData()
            .then((user: any) => Promise.all([user, agentService.fetchAgent(user.public_key)]))
            .then(([user, agent]) => Promise.all([user, factoryService.fetchFactory(agent.data.organization.id)]))
            .then(([user, factoryResult]) => {
                vnode.state.loading = false;
                vnode.state.user = user;
                vnode.state.factory = factoryResult.data;
                m.redraw();
            })
            .catch(e => {
                console.log(e);
                // sign-up or -in required
                vnode.state.loading = false;
                vnode.state.user = null;
                m.redraw();
            });
    },
    view: vnode => {
        if (vnode.state.loading) {
            return [m('.row', 'Loading...')];
        } else if (vnode.state.factory) {
            return [
                m('.container', [
                    m('.row', m('.col-10.offset-md-1', m(CertificateList, { factory: vnode.state.factory }))),
                    m('.row', m('.col-10.offset-md-1', m(FactoryRequestForm, { factory: vnode.state.factory }))),
                ]),
            ];
        } else {
            return [m('.row', 'Unable to load details')];
        }
    },
};
