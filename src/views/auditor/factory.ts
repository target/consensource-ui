import * as m from 'mithril';
import * as blockService from 'App/services/block';
import * as factoryService from 'App/services/factory';
import * as organizationService from 'App/services/organization';

interface State {
    factories: consensource.Factory[];
    loading: boolean;
    noRecordsElement: m.Vnode;
    _listener: () => void;
}

const renderRows = (items, renderer, emptyElement): any => {
    if (items.length > 0) {
        return items.map(renderer);
    } else {
        return emptyElement;
    }
};

const loadFactories = (vnode): Promise<void> =>
    factoryService
        .loadFactories()
        .then(factories => {
            vnode.state.factories = factories.data;
            vnode.state.loading = false;
        })
        .catch(() => {
            vnode.state.noRecordsElement = m('td.text-center.text-danger[colspan=9]', 'Failed to fetch factories');
        });

export const FactoryList: m.Component<{}, State> = {
    view: vnode => [
        m('table.table.table-bordered.auditor-table', [
            m(
                'thead.thead-dark',
                m('tr', [
                    m('th[scope=col]', 'Name'),
                    m('th[scope=col]', 'Address'),
                    m('th[scope=col]', 'City'),
                    m('th[scope=col]', 'State or Province'),
                    m('th[scope=col]', 'Country'),
                    m('th[scope=col]', 'Postal Code'),
                    m('th[scope=col]', 'Contact Name'),
                    m('th[scope=col]', 'Contact Phone Number'),
                    m('th[scope=col]', 'Contact Language Code'),
                ]),
            ),
            m(
                'tbody',
                renderRows(
                    vnode.state.factories,
                    factory =>
                        m('tr', [
                            m('td.pl-5', factory.name),
                            m('td.pl-5', factory.address.street_line_1),
                            m('td.pl-5', factory.address.city),
                            m('td.pl-5', factory.address.state_province),
                            m('td.pl-5', factory.address.country),
                            m('td.pl-5', factory.address.postal_code),
                            m('td.pl-5', factory.contacts[0].name),
                            m('td.pl-5', factory.contacts[0].phone_number),
                            m('td.pl-5', organizationService.languageLabel(factory.contacts[0].language_code)),
                        ]),
                    m('tr', vnode.state.noRecordsElement),
                ),
            ),
        ]),
    ],

    oninit: vnode => {
        vnode.state.factories = [];
        vnode.state.loading = true;
        vnode.state.noRecordsElement = m('td.text-center[colspan=9]', 'No factories found');
    },

    oncreate: vnode => {
        loadFactories(vnode);
        vnode.state._listener = (): Promise<void> => loadFactories(vnode);
        blockService.addBlockUpdateListener(vnode.state._listener);
    },

    onremove: vnode => {
        blockService.removeBlockUpdateListener(vnode.state._listener);
    },
};
