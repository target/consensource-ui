import * as m from 'mithril';
import { pluck } from 'App/utils';

export const loadRequests = (opts = {}): Promise<any> => {
    const params = pluck(opts, 'factory_id', 'expand');
    return m.request({
        method: 'GET',
        url: '/api/requests',
        params: params,
    });
};

export const fetchRequest = (requestId: string, opts = {}): Promise<any> => {
    const params = pluck(opts, 'expand');

    return m.request({
        method: 'GET',
        url: `/api/requests/${requestId}`,
        params: params,
    });
};
