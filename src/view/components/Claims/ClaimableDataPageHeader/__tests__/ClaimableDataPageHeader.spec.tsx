import React from 'react';
import { render, screen } from 'utils/testing';
import { ClaimableDataPageHeader } from '../ClaimableDataPageHeader';

describe('<ClaimableDataPageHeader />', () => {
  it('renders with claimed data', () => {
    const { container } = render(
      <ClaimableDataPageHeader title="cert" data={{}} />,
    );

    expect(screen.getByLabelText('claimed-icon')).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });

  it('renders with unclaimed data', () => {
    const { container } = render(
      <ClaimableDataPageHeader title="cert" data={{ assertion_id: '123' }} />,
    );

    expect(screen.getByRole('alert')).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });

  it('renders with a subtitle component', () => {
    const { container } = render(
      <ClaimableDataPageHeader
        title="cert"
        data={{}}
        subtitle={<div data-testid="subtitle" />}
      />,
    );

    expect(screen.getByTestId('subtitle')).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });

  it('renders with a subtitle text', () => {
    const text = 'Test';

    const { container } = render(
      <ClaimableDataPageHeader title="cert" data={{}} subtitle={text} />,
    );

    expect(screen.getByText(text)).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });
});
