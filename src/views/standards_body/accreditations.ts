import * as m from 'mithril';
import AuthService from 'App/services/auth';
import * as accreditCertifyingBodyService from 'App/services/accreditation';
import * as agentService from 'App/services/agent';
import * as organizationService from 'App/services/organization';
import * as standardsService from 'App/services/standards';
import * as DatePicker from 'mithril-datepicker';

interface Agent extends consensource.Agent {
    organization: consensource.Organization;
}

interface Standard extends consensource.Standard {
    standard_id: string;
}

interface State {
    loading: boolean;
    agent: Agent;
    organization: consensource.Organization;
    standards: Standard[];
    noRecordsElement: m.Vnode;
    _listener: () => void;
}

export const AccreditCertifyingBodyData = {
    certifyingBodyId: '',
    standardId: '',
    validTo: 0,
    validFrom: new Date().getTime() / 1000,
    submitting: false,
    errorMsg: null,

    hasInvalidFields: (): boolean => {
        const requiredFields = ['validTo', 'validFrom', 'standardId'];

        if (
            requiredFields.reduce(
                (acc, key) => acc || AccreditCertifyingBodyData[key] === '' || AccreditCertifyingBodyData[key] === 0,
                false,
            )
        ) {
            return true;
        }

        return false;
    },

    setCertifyingBodyId: (certifyingBodyId): void => {
        AccreditCertifyingBodyData.certifyingBodyId = certifyingBodyId;
    },

    setStandardId: (standardId): void => {
        AccreditCertifyingBodyData.standardId = standardId;
    },

    setValidTo: (timestamp): void => {
        AccreditCertifyingBodyData.validTo = timestamp;
    },

    setValidFrom: (timestamp): void => {
        AccreditCertifyingBodyData.validFrom = timestamp;
    },

    clear: (): void => {
        AccreditCertifyingBodyData.certifyingBodyId = '';
        AccreditCertifyingBodyData.standardId = '';
        AccreditCertifyingBodyData.validTo = new Date().setFullYear(new Date().getFullYear() + 1);
        AccreditCertifyingBodyData.validFrom = new Date().getTime() / 1000;
        AccreditCertifyingBodyData.submitting = false;
        AccreditCertifyingBodyData.errorMsg = null;
    },

    submit: (certifyingBodyId, standardsBodyId): Promise<any> => {
        AccreditCertifyingBodyData.submitting = true;
        return AuthService.getSigner()
            .then(signer =>
                accreditCertifyingBodyService.accreditCertifyingBody(
                    AccreditCertifyingBodyData,
                    standardsBodyId,
                    certifyingBodyId,
                    signer,
                ),
            )
            .then(() => {
                AccreditCertifyingBodyData.clear();
                m.route.set('/certifyingBodyList');
            })
            .catch(errorMsg => {
                AccreditCertifyingBodyData.errorMsg = errorMsg;
                AccreditCertifyingBodyData.submitting = false;
                m.redraw();
            });
    },
};

const Standards = {
    list: [],
    oninit: (vnode): void => {
        if (vnode.state.standards !== null) {
            if (Standards.list.length !== vnode.state.standards.length) {
                Standards.list = [];
                for (const standard of vnode.state.standards) {
                    Standards.list.push(
                        m('option', {
                            value: standard.standard_id,
                            text: standard.name,
                        }),
                    );
                }
            }
        }
    },
    view: (vnode): m.Vnode<any, any> => {
        return m(
            'select.form-control.mr-2',
            {
                oninput: (e: any) => AccreditCertifyingBodyData.setStandardId(e.target.value),
                value: AccreditCertifyingBodyData.standardId,
            },
            vnode.children,
        );
    },
};

export const AccreditCertifyingBody: m.Component<{}, State> = {
    oninit: vnode => {
        AccreditCertifyingBodyData.clear();
        vnode.state.loading = true;
        vnode.state.agent = null;
        vnode.state.organization = null;
        vnode.state.standards = null;

        return AuthService.getUserData().then((user: any) =>
            Promise.all([
                agentService.fetchAgent(user.public_key),
                organizationService.fetchOrganization(m.route.param('organization_id')),
            ])
                .then(([agent, organization]) => {
                    vnode.state.loading = false;
                    vnode.state.organization = organization.data;
                    vnode.state.agent = agent.data;
                    standardsService
                        .loadStandards(agent.data.organization.id)
                        .then(standards => {
                            standards.data.sort((a, b) => a.name > b.name);
                            vnode.state.standards = standards.data;
                            m.redraw();
                        })
                        .catch(() => {
                            vnode.state.noRecordsElement = m(
                                'td.text-center.text-danger[colspan=3]',
                                'Failed to fetch Standards',
                            );
                            vnode.state.loading = false;
                        })
                        .catch(e => {
                            console.log(e);
                            vnode.state.loading = false;
                        });
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
                m('h6', 'Accreditation Information'),
                m('div.form', [
                    AccreditCertifyingBodyData.errorMsg
                        ? m('p.text-danger', AccreditCertifyingBodyData.errorMsg)
                        : null,
                    m('div.form-group', [
                        m('div.form-group.row', [
                            m('label[for=standardId]', 'Standard ID'),
                            m(
                                'select.form-control.mr-2',
                                {
                                    oninput: (e: any) => AccreditCertifyingBodyData.setStandardId(e.target.value),
                                    value: AccreditCertifyingBodyData.standardId,
                                },
                                [
                                    m('option', {
                                        disabled: true,
                                        text: 'Choose A Standard',
                                        value: AccreditCertifyingBodyData.standardId,
                                    }),
                                    ...(vnode.state.standards
                                        ? vnode.state.standards.map(standard =>
                                              m('option', {
                                                  value: standard.standard_id,
                                                  text: standard.name,
                                              }),
                                          )
                                        : []),
                                ],
                            ),
                        ]),
                        m('div.form-group.row', [
                            m('div.col', [
                                m('label', 'Valid from'),
                                m(DatePicker, {
                                    date: new Date(),
                                    onchange: chosenDate => {
                                        AccreditCertifyingBodyData.setValidFrom(chosenDate.getTime() / 1000);
                                    },
                                }),
                            ]),
                        ]),
                        m('div.form-group.row', [
                            m('div.col', [
                                m('label', 'Valid to'),
                                m(DatePicker, {
                                    date: new Date().setFullYear(new Date().getFullYear() + 1),
                                    onchange: chosenDate => {
                                        AccreditCertifyingBodyData.setValidTo(chosenDate.getTime() / 1000);
                                    },
                                }),
                            ]),
                        ]),
                        m('div.form-group', [
                            m('div.form-group.row', [
                                m('label[for=certifyingBodyName]', 'Certifying Body Name'),
                                m('input.form-control-plaintext[type=text][readonly=true]', {
                                    value: vnode.state.organization.name,
                                }),
                            ]),
                        ]),
                    ]),

                    m(
                        'button.btn.btn-primary',
                        {
                            onclick: () => {
                                AccreditCertifyingBodyData.setCertifyingBodyId(vnode.state.organization.id);
                                AccreditCertifyingBodyData.submit(
                                    vnode.state.organization.id,
                                    vnode.state.agent.organization.id,
                                );
                            },
                            disabled:
                                AccreditCertifyingBodyData.submitting || AccreditCertifyingBodyData.hasInvalidFields(),
                        },
                        'Accredit Certifying Body',
                    ),
                ]),
            ];
        } else {
            return [m('p', 'Unable to load details')];
        }
    },
};
