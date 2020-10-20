import React from 'react';
import { render, screen } from 'utils/testing';
import { MemoryRouter, Route } from 'react-router-dom';
import { NavbarLink } from '../NavbarLink';

describe('<NavbarLink />', () => {
  it('renders an unselected link', () => {
    const label = 'label';

    const { container } = render(
      <MemoryRouter initialEntries={['/test']}>
        <Route path="/test">
          <NavbarLink route="/" label={label} />
        </Route>
      </MemoryRouter>,
    );

    expect(screen.getByText(label).className.includes('selected')).toBe(false);
    expect(container).toMatchSnapshot();
  });

  it('renders a selected link', () => {
    const label = 'label';

    const { container } = render(
      <MemoryRouter initialEntries={['/test']}>
        <Route path="/test">
          <NavbarLink route="/test" label={label} />
        </Route>
      </MemoryRouter>,
    );

    expect(screen.getByText(label).className.includes('selected')).toBe(true);
    expect(container).toMatchSnapshot();
  });

  it('sets the link target to "_blank" if "openInNewTab" is true', () => {
    render(
      <MemoryRouter initialEntries={['/test']}>
        <Route path="/test">
          <NavbarLink route="/test" label="test" openInNewTab />
        </Route>
      </MemoryRouter>,
    );

    expect(screen.getByRole('link')).toHaveAttribute('target', '_blank');
  });

  it('sets the link target to "" if "openInNewTab" is false', () => {
    render(
      <MemoryRouter initialEntries={['/test']}>
        <Route path="/test">
          <NavbarLink route="/test" label="test" />
        </Route>
      </MemoryRouter>,
    );

    expect(screen.getByRole('link')).toHaveAttribute('target', '');
  });
});
