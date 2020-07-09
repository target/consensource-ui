export const mockFactoryRes = {
  data: [
    {
      address: {
        city: 'Minneapolis',
        country: 'USA',
        postal_code: '55403',
        state_province: 'MN',
        street_line_1: '1000 Nicollet Ave',
        street_line_2: 'Floor 1',
      },
      authorizations: [
        {
          public_key:
            '039a11fdf53fdebfbe96035b5676e817e57d0ab4d152eb116eefe6a8dcbb154c55',
          role: 'Admin',
        },
        {
          public_key:
            '039a11fdf53fdebfbe96035b5676e817e57d0ab4d152eb116eefe6a8dcbb154c55',
          role: 'Transactor',
        },
      ],
      contacts: [
        {
          language_code: 'en',
          name: 'John Smith',
          phone_number: '123-456-7890',
        },
      ],
      id: '3e23e8160039594a33894f6564e1b1348bbd7a0088d42c4acb73eeaed59c009d',
      name: 'Test Org 1',
      organization_type: 'Factory',
    },
    {
      address: {
        city: 'Minneapolis',
        country: 'USA',
        postal_code: '55402',
        state_province: 'MN',
        street_line_1: '33 South 6th St',
        street_line_2: 'Floor 16',
      },
      authorizations: [
        {
          public_key:
            '035fbaa3cfd62b577975659ff4d7a0397b8e313fd9c95af5d5eac238dc3fd0bfca',
          role: 'Admin',
        },
        {
          public_key:
            '035fbaa3cfd62b577975659ff4d7a0397b8e313fd9c95af5d5eac238dc3fd0bfca',
          role: 'Transactor',
        },
      ],
      contacts: [
        { language_code: 'en', name: 'Jane Doe', phone_number: '987-654-3210' },
      ],
      id: 'ca978112ca1bbdcafac231b39a23dc4da786eff8147c4e72b9807785afee48bb',
      name: 'Test Org 2',
      organization_type: 'Factory',
    },
  ],
  head: 2,
  link: '/api/factories?head=2&limit=100&offset=0',
  paging: {
    first: '/api/factories?head=2&limit=100&offset=0',
    last: '/api/factories?head=2&limit=100&offset=0',
    limit: 100,
    next: '/api/factories?head=2&limit=100&offset=0',
    offset: 0,
    prev: '/api/factories?head=2&limit=100&offset=0',
    total: 2,
  },
};
