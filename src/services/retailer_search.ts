'use strict';

import * as m from 'mithril';
import { pluck } from 'App/utils';

const loadFactories = (opts = {}): Promise<any> => {
    const params = pluck(opts, 'name', 'expand');
    return m.request({
        method: 'GET',
        url: '/api/factories?expand=true',
        params: params,
    });
};

module.exports = {
    loadFactories,
};
