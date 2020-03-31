import * as m from 'mithril';
import AuthService from 'App/services/auth';
import * as AgentService from 'App/services/agent';
import * as FeatureFlagService from 'App/services/feature_flag';
import { testingNotificationBanner } from 'App/components/testing_banner';
import { AuthedComponent } from 'App/views/common/auth';

const _navLink = (route, asset_active, asset_inactive, label) =>
    m(
        'li.nav-item.standards_body_nav',
        m(
            m.route.Link,
            {
                selector: 'a.nav-link.standards_body_nav_link',
                href: `${route}`,
                class: m.route.get() === route ? 'active' : '',
            },
            [
                m(`img.nav_icon[src=/assets/images/${m.route.get() === route ? asset_active : asset_inactive}]`),
                m('span.nav_label.p-1.ml-1', label),
            ],
        ),
    );

const _greeting = vnode => {
    if (vnode.state.agent) {
        return m(AuthedComponent, `Hi, ${vnode.state.agent.name}`);
    } else {
        return 'Welcome, Standards Body team member!';
    }
};

const _authButtons = () => {
    if (AuthService.isSignedIn()) {
        return m(
            'li.nav-item',
            m(
                `a.nav-link[href=/index_standards_body.html].standards_body_nav_link#sign_out`,
                {
                    onclick: () => {
                        AuthService.clear();
                        m.route.set('/');
                    },
                },
                m('img.nav_icon.mr-1[src=/assets/images/logout-icon.svg]'),
                'Log Out',
            ),
        );
    } else {
        return [
            m(m.route.Link, { selector: 'a.btn.navbar-signin', href: '/signIn' }, 'Sign In'),
            FeatureFlagService.isSignupEnabled() &&
                m(
                    m.route.Link,
                    { selector: 'a.btn.btn-link.small.text-muted', href: '/signUp' },
                    'Not a member? Sign Up',
                ),
        ];
    }
};

const _getAgentData = vnode =>
    AuthService.getUserData().then((user: any) =>
        Promise.all([AgentService.fetchAgent(user.public_key)])
            .then(([agent]) => {
                vnode.state.agent = agent.data;
                vnode.state.loading = false;
                m.redraw();
            })
            .catch(e => {
                console.log(e);
                vnode.state.loading = false;
            }),
    );

export const App = {
    oninit: vnode => {
        vnode.state.agent = null;
        vnode.state.loading = false;
    },
    onupdate: vnode => {
        if (AuthService.isSignedIn() && vnode.state.agent === null && vnode.state.loading === false) {
            _getAgentData(vnode);
        }
    },
    view: vnode => {
        if (vnode.state.loading) {
            return [m('.row', 'Loading...')];
        } else {
            return [
                m('nav.navbar.navbar-expand-md.navbar-light.bg-light', [
                    m(m.route.Link, { selector: 'a.navbar-brand.org-brand.greeting_text', href: '/' }, [
                        m(
                            'span.logo-circle',
                            m('img.org-logo[src="/assets/images/pencil.svg"].d-inline-block.align-top'),
                        ),
                    ]),
                    m('span.ml-3.greeting_text', _greeting(vnode)),
                    m('div.collapse.navbar-collapse', [
                        m('ul.navbar-nav.ml-auto', [
                            m(
                                AuthedComponent,
                                _navLink(
                                    '/standardsCreate',
                                    'granted-certifications-active.svg',
                                    'granted-certifications-inactive.svg',
                                    'Create A Standard',
                                ),
                            ),
                            m(
                                AuthedComponent,
                                _navLink(
                                    '/standardsList',
                                    'certified-factories-icon.svg',
                                    'inactive-cert-factories.svg',
                                    'Standards',
                                ),
                            ),
                            m(
                                AuthedComponent,
                                _navLink(
                                    '/certifyingBodyList',
                                    'active-agents.svg',
                                    'inactive-agents.svg',
                                    'Certifying Bodies',
                                ),
                            ),
                            m(
                                AuthedComponent,
                                _navLink('/profile', 'active-profile.svg', 'profile-icon.svg', 'Profile'),
                            ),
                            _authButtons(),
                        ]),
                    ]),
                ]),
                m('main.container', { role: 'main' }, [vnode.children]),
                FeatureFlagService.isTestBannerEnabled() && testingNotificationBanner(),
            ];
        }
    },

    subpage: element => ({
        onmatch: (_args, _requestedPath) => element,
        render: vnode => m(App, vnode),
    }),
};

export const Welcome = {
    view: () => [
        m('div.landing-page.landing-page-standards-body', [
            m('div.landing-page-info', [
                m('p.landing-page-info-section.landing-page-info-header', [
                    'Promote your standards to relevant parties and accredit Certifying Bodies using ',
                    m('strong', 'ConsenSource'),
                ]),
                m('ul.landing-page-info-section', [
                    m('li', '+ Create and promote your standard to factories, suppliers, brands, and retailers'),
                    m('li', '+ View and accredit certifying bodies for your standard'),
                    m('li', '+ Rest assured that both past and current data are accurate, verified, and up-to-date'),
                ]),
                m(
                    m.route.Link,
                    {
                        selector: 'a.btn.landing-page-action-btn',
                        role: 'button',
                        href: `${AuthService.isSignedIn() ? '/standardsCreate' : '/signIn'}`,
                    },
                    'Create a standard',
                ),
            ]),
        ]),
    ],
};
