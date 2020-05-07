import TransactionService, {
    IPayloadInfo,
    BATCH_STATUS,
} from '../protobuf/batch';
import * as addressing from 'services/addressing';
import { createContext, Signer } from 'sawtooth-sdk/signing';
import {
    TransactionHeader,
    BatchHeader,
    Transaction,
    Batch,
    BatchList,
} from 'sawtooth-sdk/protobuf';
import { createHash } from 'crypto';
import * as TransactionApi from 'services/api/batch';
import { mocked } from 'ts-jest/utils';

jest.mock('services/api/transaction');
const mockedTxnApi = mocked(TransactionApi, true);

describe('Transaction Service', () => {
    const exampleAddress = addressing.makeOrganizationAddress('123');
    const cryptoContext = createContext('secp256k1');
    const privateKey = cryptoContext.newRandomPrivateKey();
    const signer = new Signer(cryptoContext, privateKey);
    const pubKey = signer.getPublicKey();

    const mockTransaction = Transaction.create({
        header: Buffer.from('test-header'),
        headerSignature: 'test-headerSignature',
        payload: Buffer.from('test-payload'),
    });

    const mockTransactionPayload: IPayloadInfo = {
        payloadBytes: Buffer.from('test-payloadBytes'),
        inputs: [exampleAddress],
        outputs: [exampleAddress],
    };

    const mockBatch = Batch.create({
        header: Buffer.from('test-header'),
        headerSignature: 'test-headerSignature',
        transactions: [mockTransaction],
    });

    const mockBatchList = BatchList.create({
        batches: [mockBatch],
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    describe('getTransactionIds()', () => {
        it('returns an array of the headerSignature field from each Transaction', () => {
            const transactions = [mockTransaction, mockTransaction];
            const transactionIds = TransactionService.getTransactionIds([
                mockTransaction,
                mockTransaction,
            ]);
            const headerSignatures = transactions.map(
                (transaction) => transaction.headerSignature,
            );

            expect(transactionIds).toEqual(headerSignatures);
        });
    });

    describe('createTransaction()', () => {
        const payloadSha512 = createHash('sha512')
            .update(mockTransactionPayload.payloadBytes)
            .digest('hex');

        const transactionHeaderBytes = {
            familyName: addressing.familyName,
            familyVersion: addressing.familyVersion,
            inputs: mockTransactionPayload.inputs,
            outputs: mockTransactionPayload.outputs,
            signerPublicKey: pubKey.asHex(),
            batcherPublicKey: pubKey.asHex(),
            dependencies: [],
            payloadSha512,
        };

        it('creates a Transaction with valid fields', () => {
            const txn = TransactionService.createTransaction(
                mockTransactionPayload,
                signer,
            );

            // Validate `header`
            const header = TransactionHeader.decode(txn.header);
            expect(header).toEqual(transactionHeaderBytes);

            // Validate `headerSignature`
            const signature = signer.sign(txn.header as Buffer);
            expect(
                cryptoContext.verify(signature, txn.header as Buffer, pubKey),
            ).toBe(true);
            expect(txn.headerSignature).toEqual(signature);

            // Validate transaction `payload`
            expect(txn.payload).toEqual(mockTransactionPayload.payloadBytes);
        });
    });

    describe('submitTransaction()', () => {
        it('creates a Transaction and submits it in a BatchList', async () => {
            const submitBatchRes = [mockTransaction.headerSignature];
            jest.spyOn(
                TransactionService,
                'createTransaction',
            ).mockReturnValueOnce(mockTransaction);
            const submitBatchSpy = jest
                .spyOn(TransactionService, 'submitBatch')
                .mockResolvedValueOnce(submitBatchRes);

            const res = await TransactionService.submitTransaction(
                mockTransactionPayload,
                signer,
            );

            expect(submitBatchSpy).toHaveBeenCalledWith(
                [mockTransaction],
                signer,
            );
            expect(res).toEqual(submitBatchRes);
        });
    });

    describe('createBatch()', () => {
        it('creates a Batch with valid fields', () => {
            const batch = TransactionService.createBatch(
                [mockTransaction],
                signer,
            );

            // Validate batch `header`
            expect(BatchHeader.decode(batch.header)).toBeTruthy();

            // Validate batch `headerSignature`
            const signature = signer.sign(batch.header as Buffer);
            expect(
                cryptoContext.verify(signature, batch.header as Buffer, pubKey),
            ).toBe(true);
            expect(batch.headerSignature).toEqual(signature);

            // Validate batch `transactions`
            expect(batch.transactions).toEqual([mockTransaction]);
        });
    });

    describe('getInvalidBatchResult()', () => {
        const transactionIds = ['123'];

        describe('given an array of invalid transactions that includes a transaction that we submitted', () => {
            it('returns the error message from the invalid transaction', () => {
                const errMsg = 'err';
                const batchResults = {
                    invalid_transactions: [{ message: errMsg }],
                };
                const err = TransactionService.getInvalidBatchResult(
                    batchResults,
                    transactionIds,
                );
                expect(err).toBe(errMsg);
            });
        });

        describe('given an array of invalid transactions with none that we submitted', () => {
            it('returns a generic error message', () => {
                const batchResults = { invalid_transactions: [] };
                const err = TransactionService.getInvalidBatchResult(
                    batchResults,
                    transactionIds,
                );
                // TODO: Use a snapshot here
                expect(err).toBe('Invalid Transaction');
            });
        });
    });

    describe('submitBatch()', () => {
        beforeEach(() => {
            jest.spyOn(TransactionService, 'createBatch').mockReturnValue(
                mockBatch,
            );
        });

        describe('given an unsuccessful call to "postBatches()"', () => {
            const errMsg = 'failure';

            it('returns a rejected promise with the error message', async () => {
                mockedTxnApi.postBatches.mockRejectedValue(errMsg);
                await expect(
                    TransactionService.submitBatch([mockTransaction], signer),
                ).rejects.toBe(errMsg);
            });
        });

        describe('given a successful call to "postBatches()"', () => {
            it('returns a promise that will resolve when the transactionIds have been committed', async () => {
                const link = 'test-link';

                mockedTxnApi.postBatches.mockResolvedValueOnce({ link });
                const waitSpy = jest
                    .spyOn(TransactionService, 'waitForCommit')
                    .mockResolvedValueOnce([mockTransaction.headerSignature]);

                const res = await TransactionService.submitBatch(
                    [mockTransaction],
                    signer,
                );

                const mockBatchListBytes = BatchList.encode(
                    mockBatchList,
                ).finish();

                expect(res).toEqual([mockTransaction.headerSignature]);

                expect(mockedTxnApi.postBatches).toHaveBeenCalledWith(
                    mockBatchListBytes,
                );
                expect(waitSpy).toHaveBeenCalledWith(
                    [mockTransaction.headerSignature],
                    link,
                );
            });
        });
    });

    describe('waitForCommit()', () => {
        const transactionIds = ['123'];
        const statusUrl = 'test';

        describe('given a batch status of "COMMITTED"', () => {
            it('returns a resolved promise with the array of transaction IDs', async () => {
                mockedTxnApi.getBatchStatus.mockResolvedValueOnce({
                    data: [{ status: BATCH_STATUS.COMMITTED }],
                });

                await expect(
                    TransactionService.waitForCommit(transactionIds, statusUrl),
                ).resolves.toEqual(transactionIds);
            });
        });

        describe('given a batch status of "INVALID"', () => {
            it('returns a rejected promise with an error message', async () => {
                const errMsg = 'test';

                mockedTxnApi.getBatchStatus.mockResolvedValueOnce({
                    data: [{ status: BATCH_STATUS.INVALID }],
                });

                jest.spyOn(
                    TransactionService,
                    'getInvalidBatchResult',
                ).mockReturnValueOnce(errMsg);

                await expect(
                    TransactionService.waitForCommit(transactionIds, statusUrl),
                ).rejects.toBe(errMsg);
            });
        });

        describe('given a batch status other than "COMMITTED" or "INVALID"', () => {
            it('recursively calls waitForCommit()', async () => {
                // Calls the original method once, and then ends the recursive loop
                const waitSpy = jest
                    .spyOn(TransactionService, 'waitForCommit')
                    .mockImplementationOnce(TransactionService.waitForCommit)
                    .mockResolvedValueOnce('');

                mockedTxnApi.getBatchStatus.mockResolvedValueOnce({
                    data: [],
                });

                await TransactionService.waitForCommit(
                    transactionIds,
                    statusUrl,
                );
                expect(waitSpy).toHaveBeenCalledTimes(2);
            });
        });
    });
});
