import * as m from 'mithril';
import { pluck } from 'App/utils';

export const loadFactories = (opts = {}): Promise<any> => {
    const params = pluck(opts, 'name', 'expand');
    return m.request({
        method: 'GET',
        url: '/api/factories?expand=true',
        params: params,
    });
};
