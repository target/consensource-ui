import React from 'react';
import { render, screen } from 'utils/testing';
import { mockCerts } from 'services/api/__mocks__';
import { CertificationCard } from '../Certification';

describe('<CertificateCard />', () => {
  const { data: certificateData } = mockCerts;

  it('Checks that the more info button works correctly', () => {
    render(<CertificationCard certification={certificateData[0]} />);
    expect(screen.getByRole('button', { name: 'More Info' })).toHaveAttribute(
      'href',
      `/certifications/${certificateData[0].id}`,
    );
  });

  describe('<Body />', () => {
    it('renders an expired cert with a warning icon', () => {
      render(<CertificationCard certification={certificateData[0]} />);
      expect(screen.getByTitle('expired certificate')).toBeInTheDocument();
      expect(screen.getByText('Expired on 8/18/2020'));
    });

    it('renders a claimed cert with a check icon', () => {
      render(<CertificationCard certification={certificateData[0]} />);
      expect(screen.getByTitle('claimed certificate')).toBeInTheDocument();
      expect(screen.getByText('Claimed'));
    });

    it('renders an unclaimed certification with an unclaimed icon', () => {
      const validCert: any = {
        ...certificateData,
        assertion_id: 5,
      };

      render(<CertificationCard certification={validCert} />);
      expect(screen.getByTitle('unclaimed certificate')).toBeInTheDocument();
      expect(screen.getByText('Unclaimed'));
    });

    it('renders a valid certification with a check icon', () => {
      const validCert: any = {
        ...certificateData,
        valid_to: 2217110400,
      };

      render(<CertificationCard certification={validCert} />);
      expect(screen.getByTitle('valid certificate')).toBeInTheDocument();
      expect(screen.getByText('Valid until 4/3/2040'));
    });
  });
});
