import * as m from 'mithril';
import AuthService from 'App/services/auth';
import * as organizationService from 'App/services/organization';
import { Organization as OrganizationProto } from 'App/protobuf';
import * as isoLangCodes from 'App/views/common/ISO-639-1-language.json';

interface Organization {
    name: string;
    id: string;
    type: number;
    contact: any;
    submitting: boolean;
    errorMsg: Error | null;
    setName: (name: string) => void;
    setType: (type: number) => void;
    setContactName: (name: string) => void;
    setContactPhoneNumber: (name: string) => void;
    setContactLanguageCode: (name: string) => void;
    clear: () => void;
    submit: () => Promise<any>;
}

interface State {
    organization: Organization;
}

interface OrganizationAPI {
    id: string;
    name: string;
    organization_type: string;
}

interface ListState {
    organizations: Array<OrganizationAPI>;
    loading: boolean;
    noRecordsElement: m.Vnode;
}

/**
 * Model/Controller for Organization Create Form
 */
export const Organization: Organization = {
    name: '',
    id: '',
    type: 0,
    contact: OrganizationProto.Contact.create(),

    submitting: false,
    errorMsg: null,

    setName: name => {
        Organization.name = name;
    },

    setType: type => {
        Organization.type = type;
    },

    setContactName: name => {
        Organization.contact.name = name;
    },

    setContactPhoneNumber: phoneNumber => {
        Organization.contact.phoneNumber = phoneNumber;
    },
    setContactLanguageCode: languageCode => {
        Organization.contact.languageCode = languageCode;
    },

    clear: () => {
        Organization.id = '';
        Organization.name = '';
        Organization.type = 0;
        Organization.contact = OrganizationProto.Contact.create();
        Organization.submitting = false;
        Organization.errorMsg = null;
    },

    submit: () => {
        Organization.submitting = true;
        return AuthService.getSigner()
            .then(signer =>
                organizationService.createOrganization(
                    Organization.name,
                    Organization.type,
                    Organization.contact,
                    signer,
                ),
            )
            .then(() => {
                Organization.clear();
                m.route.set('/profile');
                m.redraw();
            })
            .catch(errorMsg => {
                Organization.errorMsg = errorMsg;
                Organization.submitting = false;
            });
    },
};

export const OrganizationCreate: m.Component<{}, State> = {
    view: vnode => [
        m('div.form', [
            vnode.state.organization.errorMsg ? m('p.text-danger', vnode.state.organization.errorMsg) : null,
            m('div.form-group', [
                m('h3', 'Create An Organization'),
                m('label[for=organizationName]', 'Name'),
                m('input.form-control[type=text]', {
                    oninput: (e: any) => vnode.state.organization.setName(e.target.value),
                    value: vnode.state.organization.name,
                }),
                m('h5', 'Contact Information'),
                m('label[for=contactName]', 'Contact Name'),
                m('input.form-control[type=text]', {
                    oninput: (e: any) => vnode.state.organization.setContactName(e.target.value),
                    value: vnode.state.organization.contact.name,
                }),
                m('label[for=contactPhoneNumber]', 'Phone Number'),
                m('input.form-control[type=text]', {
                    oninput: (e: any) => vnode.state.organization.setContactPhoneNumber(e.target.value),
                    value: vnode.state.organization.contact.phoneNumber,
                }),
                m('label[for=contactLanguageCode]', 'Language Code'),
                m(
                    'select.form-control',
                    {
                        oninput: (e: any) => vnode.state.organization.setContactLanguageCode(e.target.value),
                        value: vnode.state.organization.contact.languageCode,
                    },
                    isoLangCodes.map(({ code, name }) => m('option', { value: code, text: name })),
                ),
            ]),
            m(
                'button.btn.btn-primary',
                {
                    onclick: vnode.state.organization.submit,
                    disabled: vnode.state.organization.submitting,
                },
                'Create',
            ),
        ]),
    ],
};

const renderRows = (
    items: Array<OrganizationAPI>,
    renderer: any,
    emptyElement: m.Vnode,
): unknown[] | m.Vnode<{}, {}> => {
    if (items.length > 0) {
        return items.map(renderer);
    } else {
        return emptyElement;
    }
};

export const OrganizationList: m.Component<{}, ListState> = {
    view: vnode => [
        m('table.table', [
            m(
                'thead.thead-dark',
                m('tr', [
                    m('th[scope=col]', 'Organization Id'),
                    m('th[scope=col]', 'Organization Name'),
                    m('th[scope=col]', 'Organization Type'),
                ]),
            ),
            m(
                'tbody',
                renderRows(
                    vnode.state.organizations,
                    (organization: OrganizationAPI) =>
                        m('tr', [
                            m('td', organization.id),
                            m('td', organization.name),
                            m('td', organization.organization_type),
                        ]),
                    m('tr', vnode.state.noRecordsElement),
                ),
            ),
        ]),
    ],

    oninit: vnode => {
        vnode.state.organizations = [];
        vnode.state.loading = true;
        vnode.state.noRecordsElement = m('td.text-center[colspan=3]', 'No Organizations Found');
    },

    oncreate: vnode => {
        organizationService
            .loadOrganizations()
            .then(organizations => {
                organizations.data.sort((a: any, b: any) => a.name > b.name);
                vnode.state.organizations = organizations.data;
                vnode.state.loading = false;
            })
            .catch(() => {
                vnode.state.noRecordsElement = m(
                    'td.text-center.text-danger[colspan=3]',
                    'Failed to fetch Organizations',
                );
            });
    },
};
