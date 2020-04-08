import * as m from 'mithril';
import * as retailerSearchService from 'App/services/retailer_search';
import { mocked } from 'ts-jest/utils';

jest.mock('mithril');
const mockedMithril = mocked(m, true);
const factory = {
    id: 'id',
    name: 'test',
    contacts: [{ name: 'contact', language_code: 'lang', phone_number: '7' }],
    authorizations: [{ public_key: 'public_key', role: 2 as consensource.Organization.Authorization.Role.TRANSACTOR }],
    address: {
        street_line_1: 'street_1',
        street_line_2: 'street_2',
        city: 'city',
        state_province: 'state',
        country: 'country',
        postal_code: '11111',
    },
    certificates: null,
    organization_type: 3 as consensource.Organization.Type.FACTORY,
};

const expanded_factory = {
    id: 'id',
    name: 'test',
    contacts: [{ name: 'contact', language_code: 'lang', phone_number: '7' }],
    authorizations: [{ public_key: 'public_key', role: 2 as consensource.Organization.Authorization.Role.TRANSACTOR }],
    address: {
        street_line_1: 'street_1',
        street_line_2: 'street_2',
        city: 'city',
        state_province: 'state',
        country: 'country',
        postal_code: '11111',
    },
    certificates: [
        {
            id: 'cert',
            certifying_body_id: 'cert_body_id',
            certifying_body: 'cert_body',
            factory_id: 'id',
            factory_name: 'test',
            standard_id: 'standard_id',
            standard_name: 'standard_name',
            standard_version: 'v1',
            valid_from: 1,
            valid_to: 2,
        },
    ],
    organization_type: 3 as consensource.Organization.Type.FACTORY,
};

describe('retailerSearchService', () => {
    describe('loadFactories()', () => {
        describe('given no options', () => {
            it('will return all factories', async () => {
                mockedMithril.request.mockResolvedValueOnce({ data: [expanded_factory] });
                await expect(retailerSearchService.loadFactories()).resolves.toEqual({ data: [expanded_factory] });
            });
        });
        describe('given a name of a factory', () => {
            it('will return the factory with that name', async () => {
                mockedMithril.request.mockResolvedValueOnce({ data: [expanded_factory] });
                await expect(retailerSearchService.loadFactories({ name: 'test' })).resolves.toEqual({
                    data: [expanded_factory],
                });
            });
        });
        describe('given expand equal to false', () => {
            it('will return factories without certificates', async () => {
                mockedMithril.request.mockResolvedValueOnce({ data: [factory] });
                await expect(retailerSearchService.loadFactories({ expand: false })).resolves.toEqual({
                    data: [factory],
                });
            });
        });
    });
});
