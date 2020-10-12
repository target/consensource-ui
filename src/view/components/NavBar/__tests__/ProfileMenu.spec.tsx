import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { StoresContext } from 'view/context';
import { ProfileMenu } from '../ProfileMenu';

const mockHistoryPush = jest.fn();
const mockLogout = jest.fn();

jest.mock('react-router-dom', () => ({
  useHistory: () => ({
    push: mockHistoryPush,
  }),
}));

describe('<ProfileMenu />', () => {
  it('opens the profile menu on click', () => {
    const { container, getByTestId, getByRole } = render(<ProfileMenu />);

    fireEvent.click(getByTestId('profile-icon-button'));

    expect(getByRole('menu')).toBeTruthy();
    expect(container).toMatchSnapshot();
  });

  it('renders without a username', () => {
    const { container, queryByTestId } = render(<ProfileMenu />);
    expect(queryByTestId('username')).toBeNull();
    expect(container).toMatchSnapshot();
  });

  it('renders the username', () => {
    const username = 'Bob';

    const { container, getByTestId } = render(
      <StoresContext.Provider
        value={{ userStore: { user: { username } } } as any}
      >
        <ProfileMenu />
      </StoresContext.Provider>,
    );

    expect(getByTestId('username').textContent).toBe(username);
    expect(container).toMatchSnapshot();
  });

  it('logs a user out and redirects to "/"', () => {
    const { getByTestId, getByText } = render(
      <StoresContext.Provider
        value={{ userStore: { logout: mockLogout } } as any}
      >
        <ProfileMenu />
      </StoresContext.Provider>,
    );

    fireEvent.click(getByTestId('profile-icon-button'));
    fireEvent.click(getByText('Logout'));

    expect(mockLogout).toHaveBeenCalled();
    expect(mockHistoryPush).toHaveBeenCalledWith('/');
  });

  it('redirects a user to "/profile"', () => {
    const { getByText, getByTestId } = render(<ProfileMenu />);

    fireEvent.click(getByTestId('profile-icon-button'));
    fireEvent.click(getByText('Profile'));

    expect(mockHistoryPush).toHaveBeenCalledWith('/profile');
  });
});
