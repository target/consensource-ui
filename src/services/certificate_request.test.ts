import * as m from 'mithril';
import { createContext, Signer } from 'sawtooth-sdk/signing';
import * as transactionService from 'App/services/transaction';
import * as certificateRequestService from 'App/services/certificate_request';
import { mocked } from 'ts-jest/utils';

jest.mock('mithril');
const mockedMithril = mocked(m, true);
jest.mock('App/services/transaction');
const mockedTransactionService = mocked(transactionService, true);

const cryptoContext = createContext('secp256k1');
const privateKey = cryptoContext.newRandomPrivateKey();
const signer = new Signer(cryptoContext, privateKey);

const api_request_1 = {
    id: 'id_1',
    factory: { id: 'factory_id_1', link: '/api/organizations/factory_id_1' },
    standard: { id: 'standard_id', link: '/api/standards/standard_id' },
    status: 2 as consensource.Request.Status.IN_PROGRESS,
    request_date: 1,
};
const api_request_2 = {
    id: 'id_2',
    factory: { id: 'factory_id_2', link: '/api/organizations/factory_id_2' },
    standard: { id: 'standard_id', link: '/api/standards/standard_id' },
    status: 2 as consensource.Request.Status.IN_PROGRESS,
    request_date: 1,
};
const expanded_api_request = {
    id: 'id_1',
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
    request_date: 1,
};
const request = { standardId: 'id', requestDate: 1, factoryId: 'factory_id' };
const change_request = {
    standardId: 'id',
    requestDate: 1,
    factoryId: 'factory_id',
    requestId: 'id',
    status: 2,
}; //IN_PROGRESS

describe('certificateRequestService', () => {
    describe('loadCertificateRequests', () => {
        describe('given no options', () => {
            it('will return all requests in an array', async () => {
                mockedMithril.request.mockResolvedValueOnce({ data: [api_request_1, api_request_2] });
                await expect(certificateRequestService.loadCertificateRequests()).resolves.toEqual({
                    data: [api_request_1, api_request_2],
                });
            });
        });
        describe('given a factory_id option', () => {
            it('will return an array of  requests made by the factory', async () => {
                mockedMithril.request.mockResolvedValueOnce({ data: [api_request_2] });
                await expect(
                    certificateRequestService.loadCertificateRequests({ factory_id: 'factory_id_2' }),
                ).resolves.toEqual({
                    data: [api_request_2],
                });
            });
        });
        describe('given an expand option', () => {
            it('will return an array of expanded requests', async () => {
                mockedMithril.request.mockResolvedValueOnce({ data: [expanded_api_request] });
                await expect(certificateRequestService.loadCertificateRequests()).resolves.toEqual({
                    data: [expanded_api_request],
                });
            });
        });
    });
    describe('openCertificateRequest', () => {
        describe('given a null signer', () => {
            it('will reject the promise', async () => {
                await expect(certificateRequestService.openCertificateRequest(request, null)).rejects.toBeTruthy();
            });
        });
        describe('given all valid paramters', () => {
            it('will submit the transaction and return the txn ids', async () => {
                mockedTransactionService.submitTransaction.mockResolvedValueOnce(['txn_id']);
                await expect(certificateRequestService.openCertificateRequest(request, signer)).resolves.toEqual([
                    'txn_id',
                ]);
            });
        });
    });
    describe('changeCertificateRequest', () => {
        describe('given a null signer', () => {
            it('will reject the promise', async () => {
                await expect(
                    certificateRequestService.changeCertificateRequest(change_request, null),
                ).rejects.toBeTruthy();
            });
        });
        describe('given all valid paramters', () => {
            it('will submit the transaction and return the txn ids', async () => {
                mockedTransactionService.submitTransaction.mockResolvedValueOnce(['txn_id']);
                await expect(
                    certificateRequestService.changeCertificateRequest(change_request, signer),
                ).resolves.toEqual(['txn_id']);
            });
        });
    });
});
