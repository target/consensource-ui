import * as BatchApi from 'services/api/batch';
import axios from 'axios';
import { mocked } from 'ts-jest/utils';

jest.mock('axios');
const mockedAxios = mocked(axios, true);

describe('postBatches()', () => {
  it('makes a post call with the appropriate headers and transformations', async () => {
    const path = '/api/batches';

    mockedAxios.post.mockResolvedValueOnce({});

    await BatchApi.postBatches({} as Uint8Array);

    expect(mockedAxios.post).toHaveBeenCalledWith(
      path,
      {},
      {
        headers: { 'Content-Type': 'application/octet-stream' },
        transformRequest: [expect.any(Function)],
      },
    );
  });
});
