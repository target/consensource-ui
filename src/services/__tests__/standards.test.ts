import * as m from 'mithril';
import { createContext, Signer } from 'sawtooth-sdk/signing';
import * as transactionService from 'App/services/transaction';
import * as standardsService from 'App/services/standards';
import { mocked } from 'ts-jest/utils';

jest.mock('mithril');
const mockedMithril = mocked(m, true);
jest.mock('App/services/transaction');
const mockedTransactionService = mocked(transactionService, true);

describe('standardsService', () => {
    const cryptoContext = createContext('secp256k1');
    const privateKey = cryptoContext.newRandomPrivateKey();

    describe('createStandard()', () => {
        const signer = new Signer(cryptoContext, privateKey);
        const standard = {
            name: 'test',
            version: 'test',
            description: 'test',
            link: 'test',
            approvalDate: 1,
        };
        const orgId = 'test';
        describe('given a null signer', () => {
            it('rejects the promise with an error message', async () => {
                await expect(standardsService.createStandard(standard, orgId, null)).rejects.toBeTruthy();
            });
        });
        describe('given a null orgId', () => {
            it('rejects the promise with an error message', async () => {
                await expect(standardsService.createStandard(standard, null, signer)).rejects.toBeTruthy();
            });
        });
        describe('given all parameters', () => {
            it('will respond with the txn ids', async () => {
                mockedTransactionService.submitTransaction.mockResolvedValueOnce(['txn_id']);
                const ids = await standardsService.createStandard(standard, orgId, signer);
                expect(ids).toEqual(['txn_id']);
            });
        });
    });
    describe('updateStandard()', () => {
        const signer = new Signer(cryptoContext, privateKey);
        const standard = {
            name: 'test',
            version: 'test',
            description: 'test',
            link: 'test',
            approvalDate: 1,
        };
        const orgId = 'test';
        describe('given a null signer with an error message', () => {
            it('rejects the promise', async () => {
                expect.assertions(1);
                await expect(standardsService.updateStandard(standard, orgId, null)).rejects.toBeTruthy();
            });
        });
        describe('given a null orgId with an error message', () => {
            it('rejects the promise', async () => {
                expect.assertions(1);
                await expect(standardsService.updateStandard(standard, null, signer)).rejects.toBeTruthy();
            });
        });
        describe('given all parameters', () => {
            it('will respond with the txn ids', async () => {
                mockedTransactionService.submitTransaction.mockResolvedValueOnce(['txn_id']);
                const ids = await standardsService.updateStandard(standard, orgId, signer);
                expect(ids).toEqual(['txn_id']);
            });
        });
    });
    describe('fetchStandard()', () => {
        it('will fetch the standard', async () => {
            mockedMithril.request.mockResolvedValueOnce({
                data: [{ standard_id: 'standard_id', standard_name: 'standard_name' }],
            });
            const standard = await standardsService.fetchStandard('org_id', 'standard_id');
            expect(standard).toEqual({ standard_id: 'standard_id', standard_name: 'standard_name' });
        });
        it('will return undefined if it does not exist', async () => {
            mockedMithril.request.mockResolvedValueOnce({
                data: [{ standard_id: 'standard_id', standard_name: 'standard_name' }],
            });
            const standard = await standardsService.fetchStandard('org_id', 'other_id');
            expect(standard).toBe(undefined);
        });
    });
    describe('loadStandards()', () => {
        it('will load the standards for the org in a data block', async () => {
            mockedMithril.request.mockResolvedValueOnce({
                data: [
                    { standard_id: 'standard_id_1', standard_name: 'standard_name_1' },
                    { standard_id: 'standard_id_2', standard_name: 'standard_name_3' },
                ],
            });
            const standard = await standardsService.loadStandards('org_id');
            expect(standard).toEqual({
                data: [
                    { standard_id: 'standard_id_1', standard_name: 'standard_name_1' },
                    { standard_id: 'standard_id_2', standard_name: 'standard_name_3' },
                ],
            });
        });
        it('will return an empty list in the data block if there are no standards', async () => {
            mockedMithril.request.mockResolvedValueOnce({
                data: [],
            });
            const standard = await standardsService.loadStandards('org_id');
            expect(standard).toEqual({ data: [] });
        });
    });
    describe('listStandards()', () => {
        it('will load all standards in a data block', async () => {
            mockedMithril.request.mockResolvedValueOnce({
                data: [
                    { standard_id: 'standard_id_1', standard_name: 'standard_name_1' },
                    { standard_id: 'standard_id_2', standard_name: 'standard_name_3' },
                ],
            });
            const standard = await standardsService.listStandards();
            expect(standard).toEqual({
                data: [
                    { standard_id: 'standard_id_1', standard_name: 'standard_name_1' },
                    { standard_id: 'standard_id_2', standard_name: 'standard_name_3' },
                ],
            });
        });
        it('will return an empty list in the data block if there are no standards', async () => {
            mockedMithril.request.mockResolvedValueOnce({
                data: [],
            });
            const standard = await standardsService.listStandards();
            expect(standard).toEqual({ data: [] });
        });
    });
});
