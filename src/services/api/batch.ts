import axios from 'axios';

export const BATCH_STATUS_WAIT = 60;

/**
 * Make a `POST` request to `/api/batches`
 */
export function postBatches(batchListBytes: Uint8Array): Promise<any> {
  const url = '/api/batches';

  return axios
    .post(url, batchListBytes, {
      headers: { 'Content-Type': 'application/octet-stream' },
      transformRequest: [(data) => data],
    })
    .catch((e: Error) => {
      throw new Error(`Failed to POST ${url}: ${e.message}`);
    });
}

/**
 * Given a batchStatusUrl, poll with a `wait` param set to `BATCH_STATUS_WAIT`
 */
export async function getBatchStatus(batchStatusUrl: string): Promise<any> {
  const url = `/api${batchStatusUrl}&wait=${BATCH_STATUS_WAIT}`;

  return axios.get(url).catch((e: Error) => {
    throw new Error(`Failed to GET ${url}: ${e.message}`);
  });
}
