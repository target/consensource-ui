import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter, Route } from 'react-router-dom';
import { AuthedNavbar, UnauthedNavbar } from '../Navbar';

describe('<AuthedNavbar />', () => {
  it('renders', () => {
    const { container } = render(
      <MemoryRouter initialEntries={['/']}>
        <Route path="/">
          <AuthedNavbar />
        </Route>
      </MemoryRouter>,
    );
    expect(container).toMatchSnapshot();
  });
});

describe('<UnauthedNavbar />', () => {
  it('renders', () => {
    const { container } = render(
      <MemoryRouter initialEntries={['/']}>
        <Route path="/">
          <UnauthedNavbar />
        </Route>
      </MemoryRouter>,
    );
    expect(container).toMatchSnapshot();
  });
});
