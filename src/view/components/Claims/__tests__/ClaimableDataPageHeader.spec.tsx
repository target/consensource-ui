import React from 'react';
import { render, screen } from 'utils/testing';
import { ClaimableDataPageHeader } from '../ClaimableDataPageHeader';

describe('<ClaimableDataPageHeader />', () => {
  it('renders with claimed data', () => {
    const { container } = render(
      <ClaimableDataPageHeader title="cert" isClaimed />,
    );

    expect(screen.getByLabelText('claimed-icon')).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });

  it('renders with unclaimed data', () => {
    const { container } = render(
      <ClaimableDataPageHeader title="cert" isClaimed={false} />,
    );

    expect(screen.getByRole('alert')).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });

  it('renders with a subtitle', () => {
    const { container } = render(
      <ClaimableDataPageHeader
        title="cert"
        isClaimed
        subtitle={<div data-testid="subtitle" />}
      />,
    );

    expect(screen.getByTestId('subtitle')).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });
});
