import { createReqWithParam } from 'services/api';

describe('createReqWithParam()', () => {
  it('returns the path without modifying if there is no params passed', () => {
    expect(createReqWithParam('/test')).toEqual('/test');
  });

  it('adds query params', () => {
    expect(createReqWithParam('/test', { head: 1, expand: true })).toEqual(
      '/test?head=1&expand=true',
    );
  });
});
