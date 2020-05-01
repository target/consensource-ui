import axios from 'axios';

export const BATCH_STATUS_WAIT = 60;

/**
 * Make a `POST` request to `/api/batches`
 */
export const postBatches = (batchListBytes: Uint8Array): Promise<any> => {
    const url = '/api/batches';
    console.log(toString.call(batchListBytes.buffer));

    return axios
        .post(url, batchListBytes, {
            headers: { 'Content-Type': 'application/octet-stream' },
            transformRequest: [(data) => data],
        })
        .catch((e: Error) =>
            Promise.reject(`Failed to POST ${url}: ${e.message}`),
        );
};

/**
 * Given a batchStatusUrl, poll with a `wait` param set to `BATCH_STATUS_WAIT`
 */
export const getBatchStatus = async (batchStatusUrl: string): Promise<any> => {
    const url = `/api${batchStatusUrl}&wait=${BATCH_STATUS_WAIT}`;

    return axios
        .get(url)
        .catch((e: Error) =>
            Promise.reject(`Failed to GET ${url}: ${e.message}`),
        );
};
