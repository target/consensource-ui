'use strict'

const m = require('mithril')
const AuthService = require('App/services/auth')
const FeatureFlagService = require('App/services/feature_flag')
const { testingNotificationBanner } = require('App/components/testing_banner')
const { AuthedComponent } = require('App/views/common/auth')

const _navLink = (route, label) =>
  m('li.nav-item.standards_body_nav',
    { class: m.route.get() === route ? 'active' : '' },
    m(`a.nav-link.standards_body_nav_link[href=${route}]`, { oncreate: m.route.link, }, label))

const _greeting = (vnode) => {
  if (vnode.state.agent) {
    return m(AuthedComponent, `Hi, ${vnode.state.agent.name}`)
  } else {
    return 'Welcome, Standards Body team member!'
  }
}



const _authButtons = () => {
  if (AuthService.isSignedIn()) {
    return m('li.nav-item',
      m(`a.nav-link[href=/index_standards_body.html].standards_body_nav_link#sign_out`, {
        onclick: () => {
          AuthService.clear()
          m.route.set('/')
        }
      }, m('img.nav_icon.mr-1[src=/assets/images/logout-icon.svg]'), 'Log Out'))
  } else {
    return [
      m('a.btn.navbar-signin[href=/signIn]', { oncreate: m.route.link }, 'Sign In'),
      FeatureFlagService.isSignupEnabled() && m('a.btn.btn-link.small.text-muted[href=/signUp]', { oncreate: m.route.link }, 'Not a member? Sign Up')
    ]
  }
}

const App = {
  _viewName: 'App',
  view: (vnode) => {
    if (vnode.state.loading) {
      return [m('.row', 'Loading...')]
    } else {
      return [
        m('nav.navbar.navbar-expand-md.navbar-light.bg-light',
          [
            m(
              "a.navbar-brand.org-brand.greeting_text[href=/]",
              { oncreate: m.route.link },
              [
                m(
                  "span.logo-circle",
                  m(
                    'img.org-logo[src="/assets/images/pencil.svg"].d-inline-block.align-top'
                  )
                )
              ]
            ),
            m('span.ml-3.greeting_text', _greeting(vnode)),
            m('div.collapse.navbar-collapse', [
              m('ul.navbar-nav.ml-auto',
                [
                  m(AuthedComponent, _navLink('/profile', 'My Profile')),
                  m(AuthedComponent, _navLink('/standardsCreate', 'Create Standard')),
                  m(AuthedComponent, _navLink('/standardsList', 'View Standards')),
                  m(AuthedComponent, _navLink('/certifyingBodyList', 'View Certifying Bodies')),
                  _authButtons()
                ]),
            ])
          ]),
        m('main.container', { role: 'main' }, [vnode.children]),
        FeatureFlagService.isTestBannerEnabled() && testingNotificationBanner()
      ]
    }
  },

  subpage: (element) => ({
    onmatch: (_args, _requestedPath) => element,
    render: (vnode) => m(App, vnode)
  })
}

const Welcome = {
  _viewName: 'Welcome',
  view: () =>
    [
      m('div.landing-page.landing-page-standards-body', [
        m('div.landing-page-info', [
          m('p.landing-page-info-section.landing-page-info-header', [
            'Promote your standards to relevant parties and accredit Certifying Bodies using ',
            m('strong', 'ConsenSource'),
          ]),
          m('ul.landing-page-info-section', [
            m('li', '+ Create and promote your standard to factories, suppliers, brands, and retailers'),
            m('li', '+ View and accredit certifying bodies for your standard'),
            m('li', '+ Rest assured that both past and current data are accurate, verified, and up-to-date')
          ]),
          m('a.btn.landing-page-action-btn', { role: 'button', href: `${AuthService.isSignedIn() ? '/standardsCreate' : '/signIn'}`, oncreate: m.route.link }, 'Create a standard'),
        ])
      ])
    ]
}

module.exports = {
  App, Welcome
}
