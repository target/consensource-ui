import React from 'react';
import { render, screen } from 'utils/testing';
import { mockCerts } from 'services/api/__mocks__';
import userEvent from '@testing-library/user-event';
import { getLocaleFromUnix } from 'utils';
import { CertificatesCell } from '../CertificatesCell';

describe('<CertificatesCell />', () => {
  it('renders without any certs', () => {
    const { container } = render(<CertificatesCell certificates={[]} />);
    expect(screen.getByText('None')).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });

  describe('with certs', () => {
    const { data: certs } = mockCerts;

    it('renders', () => {
      const { container } = render(<CertificatesCell certificates={certs} />);
      expect(container).toMatchSnapshot();
    });

    it('sets the link destination', () => {
      const { id } = certs[0];

      render(<CertificatesCell certificates={certs} />);

      expect(screen.getByRole('link')).toHaveAttribute(
        'href',
        `/certifications/${id}`,
      );
    });

    it('uses the valid_to field in the tooltip', async () => {
      const { valid_to } = certs[0];
      const data = getLocaleFromUnix(valid_to);

      render(<CertificatesCell certificates={certs} />);

      userEvent.hover(screen.getByTestId('cert-cell-tooltip'));

      expect(
        await screen.findByText(`Valid until ${data}`),
      ).toBeInTheDocument();
    });
  });
});
