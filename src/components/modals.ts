import * as m from 'mithril';

interface DialogAttrs {
    acceptLabel: string;
    cancelLabel: string;
    acceptFn: () => void;
    cancelFn: () => void;
    title: string;
}

interface SuccessAttrs {
    acceptFn: () => void;
    content: string;
}

interface Show {
    show: boolean;
}

interface Modal {
    _activeModal: { dialog: m.Component; attrs: m.Attributes; children: Array<m.ChildArray> };
    displayModal: () => boolean;
    DialogModal: m.Component;
    DialogSuccessModal: m.Component;
    ModalContainer: m.Component<Show>;
    show: (dialog: m.Component, attrs: m.Attributes, ...children: Array<m.ChildArray>) => Promise<any>;
}

const noop = (): null => null;

const DialogModal: m.Component<DialogAttrs> = {
    view(vnode) {
        const acceptLabel = vnode.attrs.acceptLabel || 'Accept';
        const cancelLabel = vnode.attrs.cancelLabel || 'Cancel';
        const acceptFn = vnode.attrs.acceptFn || noop;
        const cancelFn = vnode.attrs.cancelFn || noop;
        return m(
            `.modal.fade${Modals.displayModal() ? '.show' : ''}`,
            {
                tabindex: -1,
                role: 'dialog',
                style: Modals.displayModal() ? 'display: block;' : '',
                'aria-lableby': 'modal',
            },
            [
                m(
                    'modal-dialog',
                    { role: 'document' },
                    m('.modal-content', [
                        m('.modal-header', [
                            m('.h5.modal-title', vnode.attrs.title || ''),
                            m(
                                'button.close',
                                {
                                    type: 'button',
                                    onclick: cancelFn,
                                    'aria-label': cancelLabel,
                                },
                                m('span', { 'aria-hidden': 'true' }, m.trust('&times;')),
                            ),
                        ]),
                        m('.modal-body', vnode.children),
                        m('.modal-footer', [
                            m(
                                'button.btn.btn-secondary',
                                {
                                    onclick: cancelFn,
                                    'aria-label': cancelLabel,
                                },
                                cancelLabel,
                            ),
                            m(
                                'button.btn.btn-primary',
                                {
                                    onclick: acceptFn,
                                    'aria-label': acceptLabel,
                                },
                                acceptLabel,
                            ),
                        ]),
                    ]),
                ),
            ],
        );
    },
};

const DialogSuccessModal: m.Component<SuccessAttrs> = {
    view(vnode) {
        const acceptFn = vnode.attrs.acceptFn || noop;
        return m(
            `.modal.fade${Modals.displayModal() ? '.show' : ''}`,
            {
                tabindex: -1,
                role: 'dialog',
                style: Modals.displayModal() ? 'display: block;' : '',
                'aria-lableby': 'modal',
            },
            [
                m(
                    'modal-dialog',
                    { role: 'document' },
                    m('.modal-content', [
                        m('.h5.modal-content', vnode.attrs.content || ''),
                        m(
                            'button.close',
                            {
                                type: 'button',
                                onclick: acceptFn,
                            },
                            'Close',
                        ),
                    ]),
                ),
            ],
        );
    },
};

const Modals: Modal = {
    _activeModal: null,

    displayModal: () => Modals._activeModal !== null,

    DialogModal,

    DialogSuccessModal,

    ModalContainer: {
        view: (vnode): any => {
            if (vnode.attrs.show) {
                const { dialog, attrs, children } = Modals._activeModal;
                return m(dialog, attrs, children);
            } else {
                return null;
            }
        },
    },

    show: (dialog: m.Component, attrs: m.Attributes, ...children: Array<m.ChildArray>) => {
        let acceptFn = null;
        let cancelFn = null;

        const modalPromise = new Promise((resolve, reject) => {
            acceptFn = (): any => {
                Modals._activeModal = null;
                m.redraw();
                resolve();
            };
            cancelFn = (): any => {
                Modals._activeModal = null;
                m.redraw();
                reject();
            };
        });

        Modals._activeModal = {
            dialog,
            attrs: Object.assign(attrs, { acceptFn, cancelFn }),
            children: children,
        };

        m.redraw();

        return modalPromise;
    },
};

export default Modals;