'use strict'

const m = require('mithril')
const agentService = require('App/services/agent')
const AuthService = require('App/services/auth')
const modals = require('App/components/modals')


const _term = (name, value) => [
  m('dt.col-sm-2', name),
  m('dd.col-sm-10', value)
]

const _orgView = (vnode) => [
  m('dl.row', [_term('Name', vnode.state.agent.organization.name)])
]

const _noOrgView = () => [
      m('p', "You are not currently associated with an organization. Would you like to create one?"),
      m('a.btn.btn-success[href=/organizationCreate]',
        { oncreate: m.route.link },
        "Create an Organization")
]

const _renderTimestamp = (unixTimestamp) => {
  if (unixTimestamp) {
    let d = new Date(unixTimestamp * 1000)
    return `${d.toLocaleDateString()}`
  } else {
    return 'Unknown'
  }
}


const _updatePasswordSetter = (key) => (value) => {
  PasswordUpdate[key] = value
}

const _toggleEditPassword = (update) => {
  let editFields = document.querySelectorAll(`.password-value`)
  Object.values(editFields).map((t) => {
    t.classList.toggle("form-control-plaintext");
    t.classList.toggle("form-control");
    t.classList.toggle("mt-2");

    if (t.getAttribute("name") === `currentPassword`) {
      t.setAttribute("placeholder", 'Enter current password')
    }
    if (t.getAttribute("name") === `password`) {
      t.setAttribute("placeholder", 'Enter new password')
    }
    if (t.getAttribute("name") === `confirmPassword`) {
      t.setAttribute("placeholder", 'Confirm new password')
    }
    if (!update) {
      PasswordUpdate.clear()
    }

    return ""
  })

  let passwordFields = document.querySelectorAll(`.password-fields`)
  Object.values(passwordFields).map((t) => {
    t.classList.toggle("show");
    t.classList.toggle("hide");
    return ""
  })
}

const AgentProfile = {
  _viewName: "AgentProfile",
  oninit: (vnode) => {
    vnode.state.loading = true
    vnode.state.agent = null


    return AuthService.getUserData()
      .then((user) => agentService.fetchAgent(user.public_key)
          .then((agent) => {
            vnode.state.loading = false
            vnode.state.agent = agent.data
            PasswordUpdate.setUpdatePassword(user)
            m.redraw()
          })
          .catch(() => {
            vnode.state.loading = false
          }))

  },
  view: (vnode) => {
    if (vnode.state.loading) {
      return m('.row', 'Loading...')
    } else if (vnode.state.agent) {
      return [
        PasswordUpdate.errorMsg ? m('p.text-danger', PasswordUpdate.errorMsg) : null,
        m('h1', "Agent Profile"),
        m('dl.row', [_term('Public Key', vnode.state.agent.public_key)]),
        m('dl.row', [_term('Name', vnode.state.agent.name)]),
        m('dl.row', [_term('Member Since', _renderTimestamp(vnode.state.agent.created_on))]),
        m('.row', [
          m("input.dt.col-sm-10.password-value.password-fields.form-control-plaintext.hide[type=password][name='currentPassword']",
            {
              oninput: m.withAttr("value", PasswordUpdate.setOldPassword),
              value: PasswordUpdate.old_password,
            })]),
        m('.row', [
          m("input.dt.col-sm-10.password-value.password-fields.form-control-plaintext.hide[type=password][name='password']",
            {
              oninput: m.withAttr("value", PasswordUpdate.setPassword),
              value: PasswordUpdate.password,
            })]),
        m('.row', [
          m("input.dt.col-sm-10.password-value.password-fields.form-control-plaintext.hide[type=password][name='confirmPassword']",
            {
              oninput: m.withAttr("value", PasswordUpdate.setConfirmPassword),
              value: PasswordUpdate.confirmPassword,
            })]),
          m('.row', [
            m("button.btn.password-fields.updatePassword.m-2.hide",
              {
                onclick: () => {
                  PasswordUpdate.submit()
                  _toggleEditPassword(true)
                },
                disabled: PasswordUpdate.submitting || PasswordUpdate.invalidPassword(),
              }, "Update"),
              m('btn.btn.password-fields.cancelUpdate.m-2.hide', { onclick: () => _toggleEditPassword(false) }, 'Cancel')
          ]),
        m('dl.row', [m("btn.dt-sm-2.btn.password-fields.updatePassword.m-2.show", {onclick: () => _toggleEditPassword(true)}, "Update Password")]),
        m(modals.ModalContainer, { show: modals.displayModal() }),
        m('h4', 'My Organization'),
        vnode.state.agent.organization ? _orgView(vnode) : _noOrgView(vnode)
      ]
    } else {
      return [m('.row', "Unable to load details")]
    }
  }
}

const PasswordUpdate = {
  submitting: false,
  errorMsg: null,

  public_key: '',
  encrypted_private_key: '',

  old_password: '',
  username: '',
  password: '',
  confirmPassword: '',

  setOldPassword: _updatePasswordSetter('old_password'),
  setPassword: _updatePasswordSetter('password'),
  setConfirmPassword: _updatePasswordSetter('confirmPassword'),

  submit: () => {
    PasswordUpdate.submitting = true
    AuthService.getSigner()
      .then((signer) => {
        AuthService.updateUser(PasswordUpdate, signer)
      })
      .then(() => {
        PasswordUpdate.submitting = false
        PasswordUpdate.clear()
        m.redraw()
      })
      .catch((e) => {
        console.error(e)
        PasswordUpdate.submitting = false
        PasswordUpdate.errorMsg = e
        PasswordUpdate.clear()
        m.redraw()
      })
  },

  setUpdatePassword: (user) => {
    PasswordUpdate.public_key = user.public_key
    PasswordUpdate.username = user.username
  },

  clear: () => {
    PasswordUpdate.old_password = ''
    PasswordUpdate.password = ''
    PasswordUpdate.confirmPassword = ''
  },

  invalidPassword: () => {
    if (!PasswordUpdate.old_password || !PasswordUpdate.password || !PasswordUpdate.confirmPassword) {
      return true
    }
    if (PasswordUpdate.password !== PasswordUpdate.confirmPassword) {
      return true
    }
    return false
  },
}

module.exports = {
  AgentProfile
}
