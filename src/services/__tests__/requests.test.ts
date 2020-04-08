import * as m from 'mithril';
import * as requestService from 'App/services/requests';
import { mocked } from 'ts-jest/utils';

jest.mock('mithril');
const mockedMithril = mocked(m, true);

const request = {
    id: 'id',
    factory: { id: 'factory_id', link: '/api/organizations/factory_id' },
    standard: { id: 'standard_id', link: '/api/standards/standard_id' },
    status: 2 as consensource.Request.Status.IN_PROGRESS,
    request_date: 2,
};

const expanded_request = {
    id: 'id',
    factory: {
        id: 'factory_id',
        name: 'test_factory',
        contacts: [{ name: 'contact', language_code: 'lang', phone_number: '7' }],
        authorizations: [
            { public_key: 'public_key', role: 2 as consensource.Organization.Authorization.Role.TRANSACTOR },
        ],
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
    },
    standard: {
        standard_id: 'standard_id',
        organization_id: 'standards_body_id',
        name: 'standard',
        versions: [
            {
                version: 'v1',
                external_link: 'link.url',
                description: 'description',
                approval_date: 1,
            },
        ],
    },
    status: 2 as consensource.Request.Status.IN_PROGRESS,
    request_date: 2,
};

describe('requestService', () => {
    describe('loadRequests()', () => {
        describe('given no options', () => {
            it('will return an array of unexpanded requests', async () => {
                mockedMithril.request.mockResolvedValueOnce({ data: [request] });
                await expect(requestService.loadRequests()).resolves.toEqual({ data: [request] });
            });
        });
        describe('given a factory_id option', () => {
            it('will return that request in an array', async () => {
                mockedMithril.request.mockResolvedValueOnce({ data: [request] });
                await expect(requestService.loadRequests({ factory_id: 'factory_id' })).resolves.toEqual({
                    data: [request],
                });
            });
        });
        describe('given an expand option', () => {
            it('will return an array of expanded requests ', async () => {
                mockedMithril.request.mockResolvedValueOnce({ data: [expanded_request] });
                await expect(requestService.loadRequests({ expanded: true })).resolves.toEqual({
                    data: [expanded_request],
                });
            });
        });
    });
    describe('fetchRequest()', () => {
        describe('given no options', () => {
            it('will fetch the request with the given id', async () => {
                mockedMithril.request.mockResolvedValueOnce({ data: request });
                await expect(requestService.fetchRequest('id')).resolves.toEqual({ data: request });
            });
        });
        describe('given an expand option', () => {
            it('will the expanded request with the given id', async () => {
                mockedMithril.request.mockResolvedValueOnce({ data: expanded_request });
                await expect(requestService.fetchRequest('id', { expand: true })).resolves.toEqual({
                    data: expanded_request,
                });
            });
        });
    });
});
