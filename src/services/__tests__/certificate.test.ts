import * as m from 'mithril';
import { createContext, Signer } from 'sawtooth-sdk/signing';
import * as transactionService from 'App/services/transaction';
import * as certificateService from 'App/services/certificate';
import { mocked } from 'ts-jest/utils';

jest.mock('mithril');
const mockedMithril = mocked(m, true);
jest.mock('App/services/transaction');
const mockedTransactionService = mocked(transactionService, true);

const cryptoContext = createContext('secp256k1');
const privateKey = cryptoContext.newRandomPrivateKey();
const signer = new Signer(cryptoContext, privateKey);

const issuance = {
    id: 'id',
    requestId: 'requestId',
    validFrom: 1,
    validTo: 2,
};

const certificate_1 = {
    id: 'id_1',
    certifying_body_id: 'cert_body_id',
    certifying_body: 'cert_body_name',
    factory_id: 'factory_id_1',
    factory_name: 'factory_name',
    standard_id: 'standard_id',
    standard_name: 'standard_name',
    standard_version: 'standard_version',
    valid_from: 1,
    valid_to: 2,
};

const certificate_2 = {
    id: 'id_2',
    certifying_body_id: 'cert_body_id',
    certifying_body: 'cert_body_name',
    factory_id: 'factory_id_2',
    factory_name: 'factory_name',
    standard_id: 'standard_id',
    standard_name: 'standard_name',
    standard_version: 'standard_version',
    valid_from: 1,
    valid_to: 2,
};

describe('certificateService', () => {
    describe('issueCertificate()', () => {
        describe('given a null signer', () => {
            it('will reject the promise', async () => {
                expect(certificateService.issueCertificate(issuance, 'orgId', 'factoryId', null)).rejects.toBeTruthy();
            });
        });
        describe('given a null orgId', () => {
            it('will reject the promise', async () => {
                expect(certificateService.issueCertificate(issuance, null, 'factoryId', signer)).rejects.toBeTruthy();
            });
        });
        describe('given valid parameters', () => {
            it('will submit the transaction and return the txn ids', async () => {
                mockedTransactionService.submitTransaction.mockResolvedValueOnce(['txn_id']);
                expect(certificateService.issueCertificate(issuance, 'orgId', 'factoryId', signer)).resolves.toEqual([
                    'txn_id',
                ]);
            });
        });
    });
    describe('loadCertificates', () => {
        describe('given no options', () => {
            it('will return all certificates', async () => {
                mockedMithril.request.mockResolvedValueOnce({ data: [certificate_1, certificate_2] });
                await expect(certificateService.loadCertificates()).resolves.toEqual({
                    data: [certificate_1, certificate_2],
                });
            });
        });
        describe('given a factory_id option', () => {
            it('will return all certificates of that factory', async () => {
                mockedMithril.request.mockResolvedValueOnce({ data: [certificate_2] });
                await expect(certificateService.loadCertificates({ factory_id: 'factory_id_2' })).resolves.toEqual({
                    data: [certificate_2],
                });
            });
        });
    });
});
