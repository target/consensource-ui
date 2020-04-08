import * as m from 'mithril';
import Modals from 'App/components/modals';
import { testingNotificationBanner } from 'App/components/testing_banner';
import * as FeatureFlagService from 'App/services/feature_flag';

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

const greeting = (): string => 'Welcome, retail or brand member!';

export const App = {
    oninit: (vnode): void => {
        vnode.state.loading = false;
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
                    m('span.ml-3.greeting_text', greeting()),
                    m('div.collapse.navbar-collapse', [
                        m('ul.navbar-nav.ml-auto', [
                            navLink(
                                '/certifications',
                                'certified-factories-icon.svg',
                                'inactive-cert-factories.svg',
                                'Certified Factories',
                            ),
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

    subpage: (element): void => ({
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
