import * as m from 'mithril';
import { createContext, Signer } from 'sawtooth-sdk/signing';
import * as transactionService from 'App/services/transaction';
import * as accreditationService from 'App/services/accreditation';
import { mocked } from 'ts-jest/utils';

jest.mock('mithril');
const mockedMithril = mocked(m, true);
jest.mock('App/services/transaction');
const mockedTransactionService = mocked(transactionService, true);

const cryptoContext = createContext('secp256k1');
const privateKey = cryptoContext.newRandomPrivateKey();
const signer = new Signer(cryptoContext, privateKey);

const accreditation = {
    standardId: 'id',
};

describe('accreditationService', () => {
    describe('accreditCertifyingBody()', () => {
        describe('when given a null signer', () => {
            it('will reject the promise', async () => {
                await expect(
                    accreditationService.accreditCertifyingBody(accreditation, 'sb_id', 'cb_id', null),
                ).rejects.toBeTruthy();
            });
        });
        describe('when given all valid paramenters', () => {
            it('will submit a transaction and return the txn id', async () => {
                mockedTransactionService.submitTransaction.mockResolvedValueOnce(['txn_id']);
                expect(
                    accreditationService.accreditCertifyingBody(accreditation, 'sb_id', 'cb_id', signer),
                ).resolves.toEqual(['txn_id']);
            });
        });
    });
});
