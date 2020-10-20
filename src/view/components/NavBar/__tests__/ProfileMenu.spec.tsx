import React from 'react';
import { render, fireEvent, screen } from 'utils/test-utils';
import { stores } from 'stores';
import { ProfileMenu } from '../ProfileMenu';

const mockHistoryPush = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: () => ({
    push: mockHistoryPush,
  }),
}));

describe('<ProfileMenu />', () => {
  it('opens the profile menu on click', () => {
    const { container } = render(<ProfileMenu />);

    fireEvent.click(screen.getByRole('button'));

    expect(screen.getByRole('menu')).toBeTruthy();
    expect(container).toMatchSnapshot();
  });

  it('renders without a username', () => {
    const { container } = render(<ProfileMenu />);
    expect(screen.queryByTestId('username')).toBeNull();
    expect(container).toMatchSnapshot();
  });

  it('renders the username', () => {
    const username = 'Bob';

    jest
      .spyOn(stores.userStore, 'user', 'get')
      .mockReturnValueOnce({ username } as any);

    const { container } = render(<ProfileMenu />);

    expect(screen.getByText(username)).toBeTruthy();
    expect(container).toMatchSnapshot();
  });

  it('logs a user out and redirects to "/"', () => {
    render(<ProfileMenu />);

    const spy = jest.spyOn(stores.userStore, 'logout');

    fireEvent.click(screen.getByRole('button'));
    fireEvent.click(screen.getByText('Logout'));

    expect(spy).toHaveBeenCalled();
    expect(mockHistoryPush).toHaveBeenCalledWith('/');
  });

  it('redirects a user to "/profile"', () => {
    render(<ProfileMenu />);

    fireEvent.click(screen.getByRole('button'));
    fireEvent.click(screen.getByText('Profile'));

    expect(mockHistoryPush).toHaveBeenCalledWith('/profile');
  });
});
