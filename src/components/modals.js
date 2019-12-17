'use strict'

const m = require('mithril')

const _noop = () => null

const DialogModal = {
  view (vnode) {

    const acceptLabel = vnode.attrs.acceptLabel || 'Accept'
    const cancelLabel = vnode.attrs.cancelLabel || 'Cancel'
    const acceptFn = vnode.attrs.acceptFn || _noop
    const cancelFn = vnode.attrs.cancelFn || _noop
    return m(`.modal.fade${Modals.displayModal() ? '.show' : ''}`, {
      tabindex: -1,
      role: 'dialog',
      style: Modals.displayModal() ? 'display: block;' : '',
      'aria-lableby': 'modal'
    }, [
      m('modal-dialog', { role:'document' },
        m('.modal-content', [
          m('.modal-header', [
            m('.h5.modal-title', vnode.attrs.title || ''),
            m('button.close', {
              type: 'button',
              onclick: cancelFn,
              'aria-label': cancelLabel,
            }, m('span', {'aria-hidden': 'true'}, m.trust("&times;"))),
          ]),
          m('.modal-body', vnode.children),
          m('.modal-footer', [
            m('button.btn.btn-secondary', {
              onclick: cancelFn,
              'aria-label': cancelLabel,
            }, cancelLabel),
            m('button.btn.btn-primary', {
              onclick: acceptFn,
              'aria-label': acceptLabel,
            }, acceptLabel)
          ])
        ])
       )
    ])
  }
}

const DialogSuccessModal = {
  view(vnode) {
    let acceptFn = vnode.attrs.acceptFn || _noop
    return m(`.modal.fade${Modals.displayModal() ? '.show' : ''}`, {
      tabindex: -1,
      role: 'dialog',
      style: Modals.displayModal() ? 'display: block;' : '',
      'aria-lableby': 'modal'
    }, [
      m('modal-dialog', { role:'document' },
        m('.modal-content', [
            m('.h5.modal-content', vnode.attrs.content || ''),
            m('button.close', {
              type: 'button',
              onclick: acceptFn,
            }, 'Close'),
        ])
      )
    ])
  }
}


const Modals = {
  _activeModal:  null,

  displayModal: () => Modals._activeModal !== null,

  DialogModal,

  DialogSuccessModal,

  ModalContainer: {
    view: (vnode) => {
      if (vnode.attrs.show) {
        let {dialog, attrs, children} = Modals._activeModal
        return m(dialog, attrs, children)
      } else {
        return null
      }
    }
  },

  show:  (dialog, attrs, ...children) => {
    let acceptFn = null
    let cancelFn = null

    let modalPromise = new Promise((resolve, reject) => {
      acceptFn  = () => {
        Modals._activeModal = null
        m.redraw()
        resolve()
      }
      cancelFn = () => {
        Modals._activeModal = null
        m.redraw()
        reject()
      }
    })

    Modals._activeModal = {
      dialog,
      attrs: Object.assign(attrs, {acceptFn, cancelFn}),
      children: children
    }

    m.redraw()

    return modalPromise
  },
}

module.exports = Modals
