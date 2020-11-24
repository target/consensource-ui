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
  it('Checks that the more info button works correctly', () => {
    render(<CertificationCard certification={CertificateData[0]} />);
    userEvent.click(screen.getByText('More Info'));
    expect(screen.getByRole('button', { name: 'More Info' })).toHaveAttribute(
      'href',
      `/certifications/${CertificateData[0].id}`,
    );
  });
  it('Checks for expired date and checks the claimed logic', () => {
    render(<CertificationCard certification={CertificateData[0]} />);
    expect(screen.getByText('Expired on 8/18/2020'));
    expect(screen.getByText('Claimed'));
  });
  it('Checks for valid expiration date and checks the unclaimed logic', () => {
    CertificateData[0].valid_to = 2217110400;
    const modified_data: any = CertificateData[0];
    modified_data.assertion_id = 5;
    render(<CertificationCard certification={modified_data} />);
    expect(screen.getByText('Valid until 4/3/2040'));
    expect(screen.getByText('Unclaimed'));
  });
});
