import * as UserApi from 'services/api/user';
import axios from 'axios';
import { mocked } from 'ts-jest/utils';

jest.mock('axios');
const mockedAxios = mocked(axios, true);

describe('postUsersAuthenticate()', () => {
  it('catches 401 errors and throw a user not found error', async () => {
    mockedAxios.post.mockRejectedValue({ response: { status: 401 } });
    await expect(
      UserApi.postUsersAuthenticate({} as UserApi.UserAuthReqParams),
    ).rejects.toEqual(Error('User not found'));
  });

  it('catches non-401 errors and throws an error', async () => {
    const path = '/api/users/authenticate';
    const errMsg = 'error';

    mockedAxios.post.mockRejectedValue({ message: errMsg });

    await expect(
      UserApi.postUsersAuthenticate({} as UserApi.UserAuthReqParams),
    ).rejects.toEqual(Error(`Failed to POST ${path}: ${errMsg}`));

    expect(mockedAxios.post).toHaveBeenCalledWith(path, {});
  });
});
