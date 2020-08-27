import * as CertReqApi from 'services/api/certificateRequest';
import axios from 'axios';
import { mocked } from 'ts-jest/utils';

jest.mock('axios');
const mockedAxios = mocked(axios, true);

describe('fetchCertRequests()', () => {
  it('catches errors and throws a new error with a message', async () => {
    const path = '/api/requests';
    const errMsg = 'error';

    mockedAxios.get.mockRejectedValueOnce({ message: errMsg });

    await expect(CertReqApi.fetchCertRequests()).rejects.toEqual(
      Error(`Failed to GET ${path}: ${errMsg}`),
    );

    expect(mockedAxios.get).toHaveBeenCalledWith(path, {
      params: undefined,
    });
  });
});

describe('fetchCertRequestById()', () => {
  it('catches errors and throws a new error with a message', async () => {
    const reqId = '123';
    const path = `/api/requests/${reqId}`;
    const errMsg = 'error';

    mockedAxios.get.mockRejectedValueOnce({ message: errMsg });

    await expect(CertReqApi.fetchCertRequestById(reqId)).rejects.toEqual(
      Error(`Failed to GET ${path}: ${errMsg}`),
    );

    expect(mockedAxios.get).toHaveBeenCalledWith(path, {
      params: undefined,
    });
  });
});
