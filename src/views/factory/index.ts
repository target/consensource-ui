import * as m from 'mithril';
import AuthService from 'App/services/auth';
import * as agentService from 'App/services/agent';
import * as FeatureFlagService from 'App/services/feature_flag';
import Modals from 'App/components/modals';
import { AuthedComponent } from 'App/views/common/auth';
import { testingNotificationBanner } from 'App/components/testing_banner';

const navLink = (route, assetActive, assetInactive, label): m.Vnode<any, any> =>
    m(
        'li.nav-item.retailer_nav',
        m(
            m.route.Link,
            {
                selector: 'a.nav-link.retailer_nav_link',
                href: `${route}`,
                class: m.route.get() === route ? 'active' : '',
            },
            [
                m(`img.nav_icon[src=/assets/images/${m.route.get() === route ? assetActive : assetInactive}]`),
                m('span.nav_label.p-1.ml-1', label),
            ],
        ),
    );

const authButtons = (): m.Vnode<any, any> | m.Vnode<m.RouteLinkAttrs, {}>[] => {
    if (AuthService.isSignedIn()) {
        return m(
            'li.nav-item',
            m(
                `a.nav-link[href=/index_factory.html].retailer_nav_link#sign_out`,
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
            m(m.route.Link, { selector: 'a.btn.btn-outline-success', href: '/signIn' }, 'Sign In'),
            FeatureFlagService.isSignupEnabled() &&
                m(
                    m.route.Link,
                    { selector: 'a.btn.btn-link.small.text-muted', href: '/signUp' },
                    'Not a member? Sign Up',
                ),
        ];
    }
};

const greeting = (vnode): m.Vnode<{}, {}> | string => {
    if (vnode.state.agent) {
        return m(AuthedComponent, `Hi, ${vnode.state.agent.name}`);
    } else {
        return `Welcome, factory team member!`;
    }
};

const getAgentData = (vnode): Promise<void> =>
    AuthService.getUserData().then((user: any) =>
        Promise.all([agentService.fetchAgent(user.public_key)])
            .then(([agent]) => {
                vnode.state.agent = agent.data;
                vnode.state.loading = false;
                m.redraw();
            })
            .catch(e => {
                console.error(e);
                vnode.state.loading = false;
            }),
    );

export const App = {
    oninit: (vnode): void => {
        vnode.state.agent = null;
        vnode.state.loading = false;
    },
    onupdate: (vnode): void => {
        if (AuthService.isSignedIn() && vnode.state.agent === null && vnode.state.loading === false) {
            getAgentData(vnode);
        }
    },
    view: (vnode): m.Vnode<any, any>[] => {
        if (vnode.state.loading) {
            return [m('.row', 'Loading...')];
        } else {
            return [
                m('nav.navbar.navbar-expand-md.navbar-light.bg-light', [
                    m(m.route.Link, { selector: 'a.navbar-brand.org-brand.greeting_text', href: '/' }, [
                        m(
                            'span.logo-circle',
                            m('img.org-logo[src="/assets/images/all-factories-active.svg"].d-inline-block.align-top'),
                        ),
                    ]),
                    m('span.ml-3.greeting_text', greeting(vnode)),
                    m('div.collapse.navbar-collapse', [
                        m('ul.navbar-nav.ml-auto', [
                            m(
                                AuthedComponent,
                                navLink(
                                    '/requests',
                                    'certified-factories-icon.svg',
                                    'inactive-cert-factories.svg',
                                    'Certifications',
                                ),
                            ),
                            m(
                                AuthedComponent,
                                navLink('/profile', 'active-profile.svg', 'profile-icon.svg', 'Profile'),
                            ),
                            authButtons(),
                        ]),
                    ]),
                ]),
                m('main.container.mt-5', { role: 'main' }, [vnode.children]),
                m(Modals.ModalContainer, { show: Modals.displayModal() }),
                FeatureFlagService.isTestBannerEnabled() && testingNotificationBanner(),
            ];
        }
    },

    subpage: (element): any => ({
        onmatch: (_args, _requestedPath): any => element,
        render: (vnode): m.Vnode<unknown, unknown> => m(App, vnode),
    }),
};

export const Welcome = {
    view: (): m.Vnode<any, any>[] => [
        m('div.landing-page.landing-page-factory', [
            m('div.landing-page-info', [
                m('p.landing-page-info-section.landing-page-info-header', [
                    'Signal your commitment to sustainable practices by using ',
                    m('strong', 'ConsenSource'),
                    ' to request audits and certifications for your factory',
                ]),
                m('ul.landing-page-info-section', [
                    m('li', '+ Initiate requests to be audited and certified'),
                    m('li', '+ Broadcast your certifications and licenses to interested retailers'),
                    m('li', '+ Withdraw certification requests at any time and for any reason'),
                ]),
                m(
                    m.route.Link,
                    {
                        selector: 'a.btn.landing-page-action-btn',
                        href: `${AuthService.isSignedIn() ? '/requests' : '/signIn'}`,
                    },
                    'Open a new certification request',
                ),
            ]),
        ]),
    ],
};
