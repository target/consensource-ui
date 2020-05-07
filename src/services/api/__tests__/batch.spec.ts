import { mocked } from 'ts-jest/utils';
import axios from 'axios';
import * as TransactionApi from 'services/api/batch';
import { Batch, BatchList, Transaction } from 'sawtooth-sdk/protobuf';

jest.mock('axios');
const mockedAxios = mocked(axios, true);

describe('TransactionApi', () => {
    const mockTransaction = Transaction.create({
        header: Buffer.from('test-header'),
        headerSignature: 'test-headerSignature',
        payload: Buffer.from('test-payload'),
    });

    const mockBatch = Batch.create({
        header: Buffer.from('test-header'),
        headerSignature: 'test-headerSignature',
        transactions: [mockTransaction],
    });

    const mockBatchList = BatchList.create({
        batches: [mockBatch],
    });

    describe('postBatches()', () => {
        const mockBatchListBytes = BatchList.encode(mockBatchList).finish();

        describe('given an unsuccessful call to "api/batches"', () => {
            it('returns a rejected promise with an error message', async () => {
                const err = { message: 'error' };
                mockedAxios.post.mockRejectedValueOnce(err);
                // TODO: Use a snapshot here
                await expect(
                    TransactionApi.postBatches(mockBatchListBytes),
                ).rejects.toEqual(
                    `Failed to POST /api/batches: ${err.message}`,
                );
            });
        });

        describe('given a successful call to "api/batches"', () => {
            it('returns a response object with a link to wait on and confirms the correct request params were used', async () => {
                const res = { link: 'link' };
                const url = '/api/batches';
                mockedAxios.post.mockResolvedValueOnce(res);

                await expect(
                    TransactionApi.postBatches(mockBatchListBytes),
                ).resolves.toEqual(res);
                expect(mockedAxios.post).toHaveBeenCalledWith(url, {
                    data: mockBatchListBytes,
                    headers: { 'Content-Type': 'application/octet-stream' },
                });
            });
        });
    });

    describe('getBatchStatus()', () => {
        const batchStatusUrl = 'test';

        describe('given an unsuccessful call to "api/batches"', () => {
            it('returns a rejected promise with an error message', async () => {
                const err = { message: 'error' };
                mockedAxios.get.mockRejectedValueOnce(err);
                await expect(
                    TransactionApi.getBatchStatus(batchStatusUrl),
                ).rejects.toEqual(
                    `Failed to GET /apitest&wait=60: ${err.message}`,
                );
            });
        });

        describe('given a successful call to "api/batches"', () => {
            it('returns a response object with a link to wait on and confirms the correct request params were used', async () => {
                const url = `/api${batchStatusUrl}&wait=${TransactionApi.BATCH_STATUS_WAIT}`;
                const res = { data: [] };
                mockedAxios.get.mockResolvedValueOnce(res);

                await expect(
                    TransactionApi.getBatchStatus(batchStatusUrl),
                ).resolves.toEqual(res);
                expect(mockedAxios.get).toHaveBeenCalledWith(url);
            });
        });
    });
});
