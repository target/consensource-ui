import React from 'react';
import { render, screen } from 'utils/testing';
import { mockCerts } from 'services/api/__mocks__';
import { CertificationCard } from '../Certification';

describe('<CertificateCard />', () => {
  const { data: certificateData } = mockCerts;

  it('renders an expired cert with claimed certification and warning icon', () => {
    const { container } = render(
      <CertificationCard certification={certificateData[0]} />,
    );
    expect(container).toMatchSnapshot();
  });

  it('Checks that the more info button works correctly', () => {
    render(<CertificationCard certification={certificateData[0]} />);
    expect(screen.getByRole('button', { name: 'More Info' })).toHaveAttribute(
      'href',
      `/certifications/${certificateData[0].id}`,
    );
  });

  it('renders a valid cert with unclaimed certification and success icon', () => {
    const validCert: any = {
      ...certificateData,
      valid_to: 2217110400,
      assertion_id: 5,
    };

    const { container } = render(
      <CertificationCard certification={validCert} />,
    );
    expect(container).toMatchSnapshot();
  });
});
