import React from 'react';
import { render } from 'utils/testing';
import { AuthedNavbar, UnauthedNavbar } from '../Navbar';

describe('<AuthedNavbar />', () => {
  it('renders', () => {
    const { container } = render(<AuthedNavbar />);
    expect(container).toMatchSnapshot();
  });
});

describe('<UnauthedNavbar />', () => {
  it('renders', () => {
    const { container } = render(<UnauthedNavbar />);
    expect(container).toMatchSnapshot();
  });
});
