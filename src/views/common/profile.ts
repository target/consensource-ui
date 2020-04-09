import * as m from 'mithril';
import * as agentService from 'App/services/agent';
import AuthService from 'App/services/auth';
import Modals from 'App/components/modals';

interface Agent extends consensource.Agent {
    created_on: number;
    organization: consensource.Organization;
}

interface State {
    loading: boolean;
    agent: Agent;
}

interface PasswordUpdate {
    [id: string]: any;
    submitting: boolean;
    errorMsg: Error | null;
    public_key: string;
    encrypted_private_key: string;
    old_password: string;
    username: string;
    password: string;
    confirmPassword: string;
    setOldPassword: (value: string) => void;
    setPassword: (value: string) => void;
    setConfirmPassword: (value: string) => void;
    submit: () => void;
    setUpdatePassword: (user: any) => void;
    clear: () => void;
    invalidPassword: () => boolean;
}

const term = (name: string, value: string): m.Vnode<any, any>[] => [m('dt.col-sm-2', name), m('dd.col-sm-10', value)];

const orgView = (vnode: m.Vnode<{}, State>): m.Vnode<any, any>[] => [
    m('dl.row', [term('Name', vnode.state.agent.organization.name)]),
];

const noOrgView = (): m.Vnode<any, any>[] => [
    m('p', 'You are not currently associated with an organization. Would you like to create one?'),
    m(m.route.Link, { selector: 'a.btn.btn-success', href: '/organizationCreate' }, 'Create an Organization'),
];

const renderTimestamp = (unixTimestamp: number): string => {
    if (unixTimestamp) {
        const d = new Date(unixTimestamp * 1000);
        return `${d.toLocaleDateString()}`;
    } else {
        return 'Unknown';
    }
};

const updatePasswordSetter = (key: string) => (value: string): void => {
    PasswordUpdate[key] = value;
};

const PasswordUpdate: PasswordUpdate = {
    submitting: false,
    errorMsg: null,

    public_key: '',
    encrypted_private_key: '',

    old_password: '',
    username: '',
    password: '',
    confirmPassword: '',

    setOldPassword: updatePasswordSetter('old_password'),
    setPassword: updatePasswordSetter('password'),
    setConfirmPassword: updatePasswordSetter('confirmPassword'),

    submit: () => {
        PasswordUpdate.submitting = true;
        AuthService.getSigner()
            .then(signer => {
                AuthService.updateUser(PasswordUpdate, signer);
            })
            .then(() => {
                PasswordUpdate.submitting = false;
                PasswordUpdate.clear();
                m.redraw();
            })
            .catch(e => {
                console.error(e);
                PasswordUpdate.submitting = false;
                PasswordUpdate.errorMsg = e;
                PasswordUpdate.clear();
                m.redraw();
            });
    },

    setUpdatePassword: (user: any) => {
        PasswordUpdate.public_key = user.public_key;
        PasswordUpdate.username = user.username;
    },

    clear: () => {
        PasswordUpdate.old_password = '';
        PasswordUpdate.password = '';
        PasswordUpdate.confirmPassword = '';
    },

    invalidPassword: () => {
        if (!PasswordUpdate.old_password || !PasswordUpdate.password || !PasswordUpdate.confirmPassword) {
            return true;
        }
        if (PasswordUpdate.password !== PasswordUpdate.confirmPassword) {
            return true;
        }
        return false;
    },
};

const toggleEditPassword = (update: boolean): void => {
    const editFields = document.querySelectorAll(`.password-value`);
    editFields.forEach(t => {
        t.classList.toggle('form-control-plaintext');
        t.classList.toggle('form-control');
        t.classList.toggle('mt-2');

        if (t.getAttribute('name') === `currentPassword`) {
            t.setAttribute('placeholder', 'Enter current password');
        }
        if (t.getAttribute('name') === `password`) {
            t.setAttribute('placeholder', 'Enter new password');
        }
        if (t.getAttribute('name') === `confirmPassword`) {
            t.setAttribute('placeholder', 'Confirm new password');
        }
        if (!update) {
            PasswordUpdate.clear();
        }
    });

    const passwordFields = document.querySelectorAll(`.password-fields`);
    passwordFields.forEach(t => {
        t.classList.toggle('show');
        t.classList.toggle('hide');
    });
};

export const AgentProfile: m.Component<{}, State> = {
    oninit: vnode => {
        vnode.state.loading = true;
        vnode.state.agent = null;

        return AuthService.getUserData().then((user: any) =>
            agentService
                .fetchAgent(user.public_key)
                .then(agent => {
                    vnode.state.loading = false;
                    vnode.state.agent = agent.data;
                    PasswordUpdate.setUpdatePassword(user);
                    m.redraw();
                })
                .catch(() => {
                    vnode.state.loading = false;
                }),
        );
    },
    view: vnode => {
        if (vnode.state.loading) {
            return m('.row', 'Loading...');
        } else if (vnode.state.agent) {
            return [
                PasswordUpdate.errorMsg ? m('p.text-danger', PasswordUpdate.errorMsg) : null,
                m('h1', 'Agent Profile'),
                m('dl.row', [term('Name', vnode.state.agent.name)]),
                m('dl.row', [term('Member Since', renderTimestamp(vnode.state.agent.created_on))]),
                m('.row', [
                    m(
                        "input.dt.col-sm-10.password-value.password-fields.form-control-plaintext.hide[type=password][name='currentPassword']",
                        {
                            oninput: (e: any) => {
                                PasswordUpdate.setOldPassword(e.target.value);
                            },
                            value: PasswordUpdate.old_password,
                        },
                    ),
                ]),
                m('.row', [
                    m(
                        "input.dt.col-sm-10.password-value.password-fields.form-control-plaintext.hide[type=password][name='password']",
                        {
                            oninput: (e: any) => {
                                PasswordUpdate.setPassword(e.target.value);
                            },
                            value: PasswordUpdate.password,
                        },
                    ),
                ]),
                m('.row', [
                    m(
                        "input.dt.col-sm-10.password-value.password-fields.form-control-plaintext.hide[type=password][name='confirmPassword']",
                        {
                            oninput: (e: any) => {
                                PasswordUpdate.setConfirmPassword(e.target.value);
                            },
                            value: PasswordUpdate.confirmPassword,
                        },
                    ),
                ]),
                m('.row', [
                    m(
                        'button.btn.password-fields.updatePassword.m-2.hide',
                        {
                            onclick: () => {
                                PasswordUpdate.submit();
                                toggleEditPassword(true);
                            },
                            disabled: PasswordUpdate.submitting || PasswordUpdate.invalidPassword(),
                        },
                        'Update',
                    ),
                    m(
                        'btn.btn.password-fields.cancelUpdate.m-2.hide',
                        { onclick: () => toggleEditPassword(false) },
                        'Cancel',
                    ),
                ]),
                m('dl.row', [
                    m(
                        'btn.dt-sm-2.btn.password-fields.updatePassword.m-2.show',
                        { onclick: () => toggleEditPassword(true) },
                        'Update Password',
                    ),
                ]),
                m(Modals.ModalContainer, { show: Modals.displayModal() }),
                m('h4', 'My Organization'),
                vnode.state.agent.organization ? orgView(vnode) : noOrgView(),
            ];
        } else {
            return [m('.row', 'Unable to load details')];
        }
    },
};
