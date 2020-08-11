// import BatchService from 'services/batch';
// import * as BatchApi from 'services/api/batch';
// import { Batch, BatchList, Transaction } from 'sawtooth-sdk/protobuf';
// import stores from 'stores';

// describe('BatchService', () => {
//   const link = 'test';

//   const mockTransaction = Transaction.create({
//     header: Buffer.from('test-header'),
//     headerSignature: 'test-headerSignature',
//     payload: Buffer.from('test-payload'),
//   });

//   const mockBatch = Batch.create({
//     header: Buffer.from('test-header'),
//     headerSignature: 'test-headerSignature',
//     transactions: [mockTransaction],
//   });

//   const mockBatchListBytes = BatchList.encode({
//     batches: [mockBatch],
//   }).finish();

//   describe('submitBatch()', () => {
//     it('returns an error string on a failed POST', async () => {
//       jest
//         .spyOn(BatchApi, 'postBatches')
//         .mockRejectedValueOnce(new Error('Error'));
//       await expect(
//         BatchService.submitBatch(mockBatchListBytes),
//       ).rejects.toBeTruthy();
//     });

//     it('calls `waitForBatchCommit` with a link to the batch status endpoint', async () => {
//       const waitSpy = jest
//         .spyOn(BatchService, 'waitForBatchCommit')
//         .mockResolvedValueOnce();
//       jest
//         .spyOn(BatchApi, 'postBatches')
//         .mockResolvedValueOnce({ data: { link } });

//       await BatchService.submitBatch(mockBatchListBytes);

//       expect(waitSpy).toHaveBeenCalledWith(link);
//     });
//   });

//   describe('waitForBatchCommit()', () => {
//     let snackbarSpy: jest.SpyInstance;

//     beforeEach(() => {
//       snackbarSpy = jest.spyOn(stores.snackbarStore, 'open');
//     });

//     afterEach(() => {
//       jest.restoreAllMocks();
//     });

//     it('given a batch status of "COMMITTED", triggers the snackbar store with a success message', async () => {
//       jest.spyOn(BatchApi, 'getBatchStatus').mockResolvedValueOnce({
//         data: { data: [{ status: BATCH_STATUS.COMMITTED }] },
//       });

//       await BatchService.waitForBatchCommit(link);

//       expect(snackbarSpy).toHaveBeenCalledWith(
//         'Successfully submitted transactions to the network',
//       );
//     });

//     it('given a batch status of "INVALID", triggers the snackbar store with a failure message', async () => {
//       jest.spyOn(BatchApi, 'getBatchStatus').mockResolvedValueOnce({
//         data: { data: [{ status: BATCH_STATUS.INVALID }] },
//       });

//       await BatchService.waitForBatchCommit(link);

//       expect(snackbarSpy).toHaveBeenCalledWith(
//         'Failed to submit transactions to the network',
//       );
//     });

//     it('given a batch status of neither "COMMITTED" or "INVALID", triggers the snackbar store with a pending message', async () => {
//       jest.spyOn(BatchApi, 'getBatchStatus').mockResolvedValueOnce({
//         data: { data: [{ status: null }] },
//       });

//       await BatchService.waitForBatchCommit(link);

//       expect(snackbarSpy).toHaveBeenCalledWith(
//         'Submitting transactions to the network',
//       );
//     });
//   });
// });
