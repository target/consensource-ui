import * as TransactionService from './transaction';
import * as m from 'mithril';
import { makeOrganizationAddress } from 'App/addressing';
import { createContext, Signer } from 'sawtooth-sdk/signing';
import { TransactionHeader, BatchList, BatchHeader } from 'sawtooth-sdk/protobuf';
import { mocked } from 'ts-jest/utils';

jest.mock('mithril');
const mockedMithril = mocked(m, true);

describe('Transaction Service', () => {
    const exampleAddress = makeOrganizationAddress('123');
    const cryptoContext = createContext('secp256k1');
    const privateKey = cryptoContext.newRandomPrivateKey();
    const signer = new Signer(cryptoContext, privateKey);
    const pubKey = signer.getPublicKey();

    describe('createTransaction()', () => {
        const payload: TransactionService.PayloadInfo = {
            payloadBytes: 'bytes',
            inputs: [exampleAddress],
            outputs: [exampleAddress],
        };

        const txn = TransactionService.createTransaction(payload, signer);

        it('creates a transaction proto with valid fields', () => {
            expect(txn).toBeTruthy();

            // Validate `header`
            expect(TransactionHeader.decode(txn.header)).toBeTruthy();

            // Validate `headerSignature`
            const signature = signer.sign(txn.header);
            expect(cryptoContext.verify(signature, txn.header, pubKey)).toBe(true);
            expect(txn.headerSignature).toEqual(signature);

            // Validate transaction `payload`
            expect(txn.payload).toEqual(payload.payloadBytes);
        });
    });

    describe('submitBatch()', () => {
        const link = 'test';
        const txnId = 'id';
        const mockTxn = {
            headerSignature: txnId,
        } as sawtooth.protobuf.Transaction;

        const waitSpy = jest.spyOn(TransactionService, '_waitForCommit').mockResolvedValue([txnId]);
        const formatSpy = jest.spyOn(TransactionService, '_formatStatusUrl').mockReturnValue(link);

        mockedMithril.request.mockResolvedValue({ link });

        it('creates a batch proto with valid fields', async () => {
            await TransactionService.submitBatch([mockTxn], signer);

            const batchListBytes = mockedMithril.request.mock.calls[0][0]['body'];
            const decodedBatchList = BatchList.decode(batchListBytes);
            const batch = decodedBatchList['batches'][0];

            expect(waitSpy).toHaveBeenCalledWith([mockTxn.headerSignature], link);
            expect(formatSpy).toHaveBeenCalledWith(link);

            // Validate batch `header`
            expect(BatchHeader.decode(batch.header)).toBeTruthy();

            // Validate batch `headerSignature`
            const signature = signer.sign(batch.header);
            expect(cryptoContext.verify(signature, batch.header, pubKey)).toBe(true);
            expect(batch.headerSignature).toEqual(signature);

            // Validate batch `transactions`
            expect(batch.transactions).toEqual([mockTxn]);
        });
    });
});
