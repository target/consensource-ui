import * as StandardApi from 'services/api/standard';
import axios from 'axios';
import { mocked } from 'ts-jest/utils';

jest.mock('axios');
const mockedAxios = mocked(axios, true);

describe('fetchAllOrgStandards()', () => {
  it('catches errors and throws a new error with a message', async () => {
    const path = '/api/standards_body/standards';
    const errMsg = 'error';

    mockedAxios.get.mockRejectedValueOnce({ message: errMsg });

    await expect(StandardApi.fetchAllOrgStandards()).rejects.toEqual(
      Error(`Failed to GET ${path}: ${errMsg}`),
    );

    expect(mockedAxios.get).toHaveBeenCalledWith(path, {
      params: undefined,
    });
  });
});

describe('fetchAllStandards()', () => {
  it('catches errors and throws a new error with a message', async () => {
    const path = '/api/standards';
    const errMsg = 'error';

    mockedAxios.get.mockRejectedValueOnce({ message: errMsg });

    await expect(StandardApi.fetchAllStandards()).rejects.toEqual(
      Error(`Failed to GET ${path}: ${errMsg}`),
    );

    expect(mockedAxios.get).toHaveBeenCalledWith(path, {
      params: undefined,
    });
  });
});
