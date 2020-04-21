import * as TransactionService from '../transaction';
import axios from 'axios';
import * as addressing from 'services/addressing';
import { createContext, Signer } from 'sawtooth-sdk/signing';
import {
    Batch,
    TransactionHeader,
    BatchList,
    BatchHeader,
    Transaction,
} from 'sawtooth-sdk/protobuf';
import { mocked } from 'ts-jest';
import { createHash } from 'crypto';

jest.mock('axios');
const mockedAxios = mocked(axios, true);

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

    const mockTransactionPayload: TransactionService.PayloadInfo = {
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
                transaction => transaction.headerSignature,
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

    describe.only('submitTransaction()', () => {
        it('creates a Transaction and submits it in a BatchList', async () => {
            const submitBatchRes = [mockTransaction.headerSignature];
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

    describe('postBatches()', () => {
        const mockBatchListBytes = BatchList.encode(mockBatchList).finish();

        describe('given an unsuccessful call to "api/batches"', () => {
            it('returns a rejected promise with an error message', async () => {
                const errMsg = 'error';
                mockedAxios.post.mockRejectedValueOnce(errMsg);
                // TODO: Use a snapshot here
                await expect(
                    TransactionService.postBatches(mockBatchListBytes),
                ).rejects.toEqual(errMsg);
            });
        });

        describe('given a successful call to "api/batches"', () => {
            it('returns a response object with a link to wait on and confirms the correct request params were used', async () => {
                // TODO: We should create an interface for returns from this endpoint
                const res = { link: 'link' };
                const url = '/api/batches';
                mockedAxios.post.mockResolvedValueOnce(res);

                await expect(
                    TransactionService.postBatches(mockBatchListBytes),
                ).resolves.toEqual(res);
                expect(mockedAxios.post).toHaveBeenCalledWith({
                    method: 'POST',
                    url,
                    body: mockBatchListBytes,
                    headers: { 'Content-Type': 'application/octet-stream' },
                    serialize: expect.any(Function),
                });
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
                jest.spyOn(TransactionService, 'postBatches').mockRejectedValue(
                    errMsg,
                );
                await expect(
                    TransactionService.submitBatch([mockTransaction], signer),
                ).rejects.toBe(errMsg);
            });
        });

        describe('given a successful call to "postBatches()"', () => {
            it('returns a promise that will resolve when the transactionIds have been committed', async () => {
                const link = 'test-link';

                const postSpy = jest
                    .spyOn(TransactionService, 'postBatches')
                    .mockResolvedValueOnce({ link });
                const formatSpy = jest
                    .spyOn(TransactionService, 'formatStatusUrl')
                    .mockReturnValueOnce(link);
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

                expect(postSpy).toHaveBeenCalledWith(mockBatchListBytes);
                expect(formatSpy).toHaveBeenCalledWith(link);
                expect(waitSpy).toHaveBeenCalledWith(
                    [mockTransaction.headerSignature],
                    link,
                );
            });
        });
    });

    describe('formatStatusUrl()', () => {
        it('formats the status url', () => {
            expect(TransactionService.formatStatusUrl('/test')).toEqual(
                '/api/test',
            );
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

    describe('getBatchStatus()', () => {
        const statusUrl = 'test';

        describe('given an unsuccessful call to "api/batches"', () => {
            it('returns a rejected promise with an error message', async () => {
                const errMsg = 'error';
                mockedAxios.get.mockRejectedValueOnce(errMsg);
                // TODO: Use a snapshot here
                await expect(
                    TransactionService.getBatchStatus(statusUrl),
                ).rejects.toEqual(errMsg);
            });
        });

        describe('given a successful call to "api/batches"', () => {
            it('returns a response object with a link to wait on and confirms the correct request params were used', async () => {
                // TODO: We should create an interface for returns from this endpoint
                const res = { data: [] };
                const url = `${statusUrl}&wait=${TransactionService.BATCH_STATUS_WAIT}`;
                mockedAxios.get.mockResolvedValueOnce(res);

                await expect(
                    TransactionService.getBatchStatus(statusUrl),
                ).resolves.toEqual(res);
                expect(mockedAxios.get).toHaveBeenCalledWith({
                    method: 'GET',
                    url,
                });
            });
        });
    });

    describe('waitForCommit()', () => {
        const transactionIds = ['123'];
        const statusUrl = 'test';

        describe('given a batch status of "COMMITTED"', () => {
            it('returns a resolved promise with the array of transaction IDs', async () => {
                jest.spyOn(
                    TransactionService,
                    'getBatchStatus',
                ).mockResolvedValueOnce({
                    data: [
                        { status: TransactionService.BATCH_STATUS.COMMITTED },
                    ],
                });

                await expect(
                    TransactionService.waitForCommit(transactionIds, statusUrl),
                ).resolves.toEqual(transactionIds);
            });
        });

        describe('given a batch status of "INVALID"', () => {
            it('returns a rejected promise with an error message', async () => {
                const errMsg = 'test';

                jest.spyOn(
                    TransactionService,
                    'getBatchStatus',
                ).mockResolvedValueOnce({
                    data: [{ status: TransactionService.BATCH_STATUS.INVALID }],
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

                jest.spyOn(
                    TransactionService,
                    'getBatchStatus',
                ).mockResolvedValueOnce({
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
