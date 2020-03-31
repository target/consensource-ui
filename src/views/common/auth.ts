import * as m from 'mithril';
import { inputField } from 'App/components/forms';
import AuthService from 'App/services/auth';
import * as agentService from 'App/services/agent';
import * as FeatureFlagService from 'App/services/feature_flag';

export const AuthedComponent: m.Component = {
    view(vnode) {
        if (AuthService.isSignedIn()) {
            return vnode.children;
        } else {
            return [];
        }
    },
};

interface SignIn {
    submitting: boolean;
    errorMsg: Error | null;
    username: string;
    password: string;
    setUsername: (val: string) => void;
    setPassword: (val: string) => void;
    clear: () => void;
    submit: () => void;
}

const SignIn: SignIn = {
    submitting: false,
    errorMsg: null,

    username: '',
    password: '',

    setUsername: (value: string) => {
        SignIn.username = value;
    },

    setPassword: (value: string) => {
        SignIn.password = value;
    },

    clear: () => {
        SignIn.submitting = false;
        SignIn.errorMsg = null;
        SignIn.username = '';
        SignIn.password = '';
    },

    submit: () => {
        SignIn.submitting = true;
        AuthService.authenticate(SignIn.username, SignIn.password)
            .then(() => {
                SignIn.clear();
                m.route.set('/');
            })
            .catch((e: Error) => {
                console.error(e);
                SignIn.errorMsg = e;
                SignIn.submitting = false;
            });
    },
};

/**
 * Form for Signing in a User
 */
export const SignInForm = {
    oninit() {
        SignIn.clear();
    },

    view() {
        return [
            m('h2', 'Sign In'),
            m('.form', [
                SignIn.errorMsg ? m('p.text-danger', SignIn.errorMsg) : null,
                inputField('username', 'Email', SignIn.username, SignIn.setUsername),
                inputField('password', 'Password', SignIn.password, SignIn.setPassword, 'password'),
                m('.row', [
                    m(
                        'button.btn.btn-primary',
                        {
                            onclick: SignIn.submit,
                            disabled: SignIn.submitting,
                        },
                        'Sign In',
                    ),
                    FeatureFlagService.isSignupEnabled() &&
                        m(
                            m.route.Link,
                            {
                                selector: 'a.btn.btn-link.small.text-muted',
                                href: '/signUp',
                            },
                            'Not a member? Sign Up',
                        ),
                ]),
            ]),
        ];
    },
};

interface SignUp extends SignIn {
    confirmPassword: string;
    name: string;
    setConfirmPassword: (value: string) => void;
    setName: (value: string) => void;
    invalidFields: () => boolean;
}

const AgentSignUp: SignUp = {
    submitting: false,
    errorMsg: null,

    username: '',
    password: '',
    confirmPassword: '',
    name: '',

    setUsername: (value: string) => {
        AgentSignUp.username = value;
    },

    setPassword: (value: string) => {
        AgentSignUp.password = value;
    },

    setConfirmPassword: (value: string) => {
        AgentSignUp.confirmPassword = value;
    },

    setName: (value: string) => {
        AgentSignUp.name = value;
    },

    submit: () => {
        AgentSignUp.submitting = true;
        AuthService.createUser(AgentSignUp, (signer: sawtooth.signing.Signer) =>
            agentService.createAgent(AgentSignUp.name, signer),
        )
            .then(() => {
                AgentSignUp.clear();
                m.route.set('/');
            })
            .catch(e => {
                console.error(e);
                AgentSignUp.submitting = false;
                AgentSignUp.errorMsg = e;
            });
    },

    clear: () => {
        AgentSignUp.submitting = false;
        AgentSignUp.errorMsg = null;

        AgentSignUp.username = '';
        AgentSignUp.password = '';
        AgentSignUp.confirmPassword = '';
        AgentSignUp.name = '';
    },

    invalidFields: () => {
        if (!AgentSignUp.username) {
            return true;
        }
        if (AgentSignUp.password !== AgentSignUp.confirmPassword) {
            return true;
        }

        if (!AgentSignUp.name) {
            return true;
        }

        return false;
    },
};

/**
 * Agent Sign Up form component
 */
export const AgentSignUpForm = {
    oninit() {
        AgentSignUp.clear();
    },
    view() {
        return [
            m('h2', 'Sign Up'),
            m('.form', [
                AgentSignUp.errorMsg ? m('p.text-danger', AgentSignUp.errorMsg) : null,

                inputField('username', 'Email', AgentSignUp.username, AgentSignUp.setUsername),
                inputField('password', 'Password', AgentSignUp.password, AgentSignUp.setPassword, 'password'),
                inputField(
                    'confirmPassword',
                    'Confirm Password',
                    AgentSignUp.confirmPassword,
                    AgentSignUp.setConfirmPassword,
                    'password',
                ),

                inputField('name', 'Name', AgentSignUp.name, AgentSignUp.setName),

                m(
                    '.row',
                    m(
                        'button.btn.btn-primary',
                        {
                            onclick: AgentSignUp.submit,
                            disabled: AgentSignUp.submitting || AgentSignUp.invalidFields(),
                        },
                        'Sign Up',
                    ),
                ),
            ]),
        ];
    },
};
