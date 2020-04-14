import * as m from 'mithril';
import Modals from 'App/components/modals';
import { testingNotificationBanner } from 'App/components/testing_banner';
import * as FeatureFlagService from 'App/services/feature_flag';
import { AuthedComponent } from 'App/views/common/auth';
import AuthService from 'App/services/auth';
import * as AgentService from 'App/services/agent';

declare global {
    interface Window {
        gtag: Function;
        ga_measurement_id: string;
    }
}

const navLink = (route, assetActive, assetInactive, label): m.Vnode<any, any> =>
    m(
        'li.nav-item.retailer_nav',
        m(
            m.route.Link,
            {
                selector: 'a.nav-link.retailer_nav_link',
                href: route,
                class: m.route.get().startsWith(route) ? 'active' : '',
            },
            [
                m(`img.nav_icon[src=/assets/images/${m.route.get().startsWith(route) ? assetActive : assetInactive}]`),
                m('span.nav_label.p-1.ml-1', label),
            ],
        ),
    );

const greeting = (vnode): m.Vnode<{}, {}> | string => {
    if (vnode.state.agent) {
        return m(AuthedComponent, `Hi, ${vnode.state.agent.name}`);
    } else {
        return 'Welcome, retail or brand member!';
    }
};

const authButtons = (): m.Vnode<any, any> | m.Vnode<m.RouteLinkAttrs, {}>[] => {
    if (AuthService.isSignedIn()) {
        return m(
            'li.nav-item',
            m(
                `a.nav-link[href=/index_retailer.html].retailer_nav_link#sign_out`,
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

const getAgentData = (vnode): Promise<any> =>
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
                            m(
                                'img.org-logo[src="/assets/images/granted-certifications-active.svg"].d-inline-block.align-top',
                            ),
                        ),
                    ]),
                    m('span.ml-3.greeting_text', greeting(vnode)),
                    m('div.collapse.navbar-collapse', [
                        m('ul.navbar-nav.ml-auto', [
                            m(
                                AuthedComponent,
                                navLink(
                                    '/certifications',
                                    'certified-factories-icon.svg',
                                    'inactive-cert-factories.svg',
                                    'Certified Factories',
                                ),
                            ),
                            m(
                                AuthedComponent,
                                navLink('/profile', 'active-profile.svg', 'profile-icon.svg', 'Profile'),
                            ),
                            authButtons(),
                            // navLink('/agents', 'active-agents.svg', 'inactive-agents.svg', 'Agents'),
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
        onmatch: (_args, _requestedPath): any => {
            window.gtag('config', window.ga_measurement_id, { page_path: _requestedPath });
            return element;
        },
        render: (vnode): m.Vnode<unknown, unknown> => m(App, vnode),
    }),
};

export const Welcome = {
    view: (): m.Vnode<any, any>[] => [
        m('div.landing-page.landing-page-retailer', [
            m('div.landing-page-info', [
                m('p.landing-page-info-section.landing-page-info-header', [
                    'Use ',
                    m('strong', 'ConsenSource'),
                    ' to help retailers and brands ensure a transparent and responsible supply chain, from source to shelf',
                ]),
                m('ul.landing-page-info-section', [
                    m('li', '+ Search for a variety of certified factories'),
                    m('li', '+ View important certifications, licenses, and contact information for each retailer'),
                    m('li', '+ Rest assured that both past and current data are accurate, verified, and up-to-date'),
                ]),
                m(
                    m.route.Link,
                    {
                        selector: 'a.btn.landing-page-action-btn',
                        href: '/certifications',
                    },
                    'Start the search for certified factories',
                ),
            ]),
        ]),
    ],
};
