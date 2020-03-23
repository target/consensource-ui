'use strict';

import * as m from 'mithril';
import { pluck } from 'App/utils';

const loadRequests = (opts = {}): Promise<any> => {
    const params = pluck(opts, 'factory_id', 'expand');
    return m.request({
        method: 'GET',
        url: '/api/requests',
        params: params,
    });
};

const fetchRequest = (requestId: string, opts = {}): Promise<any> => {
    const params = pluck(opts, 'expand');

    return m.request({
        method: 'GET',
        url: `/api/requests/${requestId}`,
        params: params,
    });
};

module.exports = {
    loadRequests,
    fetchRequest,
};
