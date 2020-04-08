import * as m from 'mithril';

export const testingNotificationBanner = (): m.Vnode<any, any> =>
    m('footer.test-banner-footer', [
        m('div.container', [m('p.test-banner-text', 'This is a test instance of the ConsenSource application')]),
    ]);
