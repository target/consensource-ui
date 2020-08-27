import * as OrgApi from 'services/api/organization';
import axios from 'axios';
import { mocked } from 'ts-jest/utils';

jest.mock('axios');
const mockedAxios = mocked(axios, true);

describe('fetchOrganizations()', () => {
  it('catches errors and throws a new error with a message', async () => {
    const path = '/api/organizations';
    const errMsg = 'error';

    mockedAxios.get.mockRejectedValueOnce({ message: errMsg });

    await expect(OrgApi.fetchOrganizations()).rejects.toEqual(
      Error(`Failed to GET ${path}: ${errMsg}`),
    );

    expect(mockedAxios.get).toHaveBeenCalledWith(path, {
      params: undefined,
    });
  });
});

describe('fetchOrganizationById()', () => {
  it('catches errors and throws a new error with a message', async () => {
    const orgId = '123';
    const path = `/api/organizations/${orgId}`;
    const errMsg = 'error';

    mockedAxios.get.mockRejectedValueOnce({ message: errMsg });

    await expect(OrgApi.fetchOrganizationById(orgId)).rejects.toEqual(
      Error(`Failed to GET ${path}: ${errMsg}`),
    );

    expect(mockedAxios.get).toHaveBeenCalledWith(path, {
      params: undefined,
    });
  });
});
