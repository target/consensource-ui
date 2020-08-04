import axios from 'axios';
import { BaseApiRes } from 'services/api/utils';

export const BATCH_STATUS_WAIT = 60;

export interface PostBatchRes extends BaseApiRes {
  link: string;
}

export interface BatchStatusRes
  extends BaseApiRes<sawtooth.protobuf.ClientBatchStatus[]> {
  link: string;
}

/**
 * Make a `POST` request to `/api/batches`
 */
export async function postBatches(batchListBytes: Uint8Array) {
  const url = '/api/batches';

  const res = await axios
    .post<PostBatchRes>(url, batchListBytes, {
      headers: { 'Content-Type': 'application/octet-stream' },
      transformRequest: [(data) => data],
    })
    .catch(({ message }: Error) => {
      throw new Error(`Failed to POST ${url}: ${message}`);
    });

  return res.data;
}

/**
 * Given a batchStatusUrl, poll with a `wait` param set to `BATCH_STATUS_WAIT`
 */
export async function getBatchStatus(batchStatusUrl: string) {
  const url = `/api${batchStatusUrl}&wait=${BATCH_STATUS_WAIT}`;

  const res = await axios
    .get<BatchStatusRes>(url)
    .catch(({ message }: Error) => {
      throw new Error(`Failed to GET ${url}: ${message}`);
    });

  return res.data;
}
