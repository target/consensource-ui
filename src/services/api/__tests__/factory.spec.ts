import * as FactoryApi from 'services/api/factory';
import axios from 'axios';
import { mocked } from 'ts-jest/utils';

jest.mock('axios');
const mockedAxios = mocked(axios, true);

describe('fetchAllFactories()', () => {
  it('catches errors and throws a new error with a message', async () => {
    const path = '/api/factories';
    const errMsg = 'error';

    mockedAxios.get.mockRejectedValueOnce({ message: errMsg });

    await expect(FactoryApi.fetchAllFactories()).rejects.toEqual(
      Error(`Failed to GET ${path}: ${errMsg}`),
    );

    expect(mockedAxios.get).toHaveBeenCalledWith(path, {
      params: undefined,
    });
  });
});

describe('fetchFactoryByOrgId()', () => {
  it('catches errors and throws a new error with a message', async () => {
    const orgId = '123';
    const path = `/api/factories/${orgId}`;
    const errMsg = 'error';

    mockedAxios.get.mockRejectedValueOnce({ message: errMsg });

    await expect(FactoryApi.fetchFactoryByOrgId(orgId)).rejects.toEqual(
      Error(`Failed to GET ${path}: ${errMsg}`),
    );

    expect(mockedAxios.get).toHaveBeenCalledWith(path, {
      params: undefined,
    });
  });
});
