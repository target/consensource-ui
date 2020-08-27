import * as CertApi from 'services/api/certificate';
import axios from 'axios';
import { mocked } from 'ts-jest/utils';

jest.mock('axios');
const mockedAxios = mocked(axios, true);

describe('loadCertificates()', () => {
  it('catches errors and throws a new error with a message', async () => {
    const path = '/api/certificates';
    const errMsg = 'error';

    mockedAxios.get.mockRejectedValueOnce({ message: errMsg });

    await expect(CertApi.loadCertificates()).rejects.toEqual(
      Error(`Failed to GET ${path}: ${errMsg}`),
    );

    expect(mockedAxios.get).toHaveBeenCalledWith(path, {
      params: undefined,
    });
  });
});
