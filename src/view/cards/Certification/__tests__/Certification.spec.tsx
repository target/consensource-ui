import userEvent from '@testing-library/user-event';
import React from 'react';
import { render, screen } from 'utils/testing';
import { mockCerts } from 'services/api/__mocks__';
import { CertificationCard } from '../Certification';

describe('<Certificates />', () => {
  const { data: CertificateData } = mockCerts;
  it('renders', () => {
    const { container } = render(
      <CertificationCard certification={CertificateData[0]} />,
    );
    expect(container).toMatchSnapshot();
  });
  it('Checks that the logic for expiration date is working and checks that the more info button works', () => {
    render(<CertificationCard certification={CertificateData[0]} />);
    expect(screen.getByText('Expired on 8/18/2020'));
    expect(screen.getByText('Claimed'));
    userEvent.click(screen.getByText('More Info'));
    expect(screen.getByRole('button')).toHaveAttribute(
      'href',
      `/certifications/${CertificateData[0].id}`,
    );
  });
});
