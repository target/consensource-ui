export const mockCerts = {
  data: [
    {
      id: 'a978112ca1bbdcafac231b39a23dc4da786eff8147c4e72b9807785afee4811',
      certifying_body_id:
        'a978112ca1bbdcafac231b39a23dc4da786eff8147c4e72b9807785afee4812',
      certifying_body: 'Test Certifying Body',
      factory_id:
        'a978112ca1bbdcafac231b39a23dc4da786eff8147c4e72b9807785afee4813',
      factory_name: 'Test Factory',
      standard_id:
        'a978112ca1bbdcafac231b39a23dc4da786eff8147c4e72b9807785afee4814',
      standard_name: 'Test Standard',
      standard_version: '0.1',
      valid_from: 1597779522,
      valid_to: 1597789522,
    },
  ],
  head: 2,
  link: '/api/certificates?head=2&limit=100&offset=0',
  paging: {
    first: '/api/certificates?head=2&limit=100&offset=0',
    last: '/api/certificates?head=2&limit=100&offset=0',
    limit: 100,
    next: '/api/certificates?head=2&limit=100&offset=0',
    offset: 0,
    prev: '/api/certificates?head=2&limit=100&offset=0',
    total: 2,
  },
};
