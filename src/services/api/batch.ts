import axios from 'axios';
import { ClientBatchStatus } from 'sawtooth-sdk/protobuf';
import { BaseApiRes } from './utils';

export const BATCH_STATUS_WAIT = 60;

export interface PostBatchRes extends BaseApiRes {
  link: string;
}

export interface BatchStatusRes extends BaseApiRes<ClientBatchStatus[]> {
  link: string;
}

/**
 * Make a `POST` request to `/api/batches`
 */
export async function postBatches(batchListBytes: Uint8Array) {
  const res = await axios.post<PostBatchRes>('/api/batches', batchListBytes, {
    headers: { 'Content-Type': 'application/octet-stream' },
    transformRequest: [(data) => data],
  });

  return res.data;
}

/**
 * Given a batchStatusLink, poll with a `wait` param set to `BATCH_STATUS_WAIT`
 */
export async function getBatchStatus(batchStatusLink: string) {
  const res = await axios.get<BatchStatusRes>(
    `/api${batchStatusLink}&wait=${BATCH_STATUS_WAIT}`,
  );

  return res.data;
}
