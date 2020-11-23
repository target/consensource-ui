import userEvent from '@testing-library/user-event';
import React from 'react';
import { render, fireEvent, screen } from 'utils/testing';
import { mockCerts } from 'services/api/__mocks__';
import { CertificationCard } from '../Certification';

describe('<Certificates />', () => {
  const certificate = { ...mockCerts, data: [] as any };
  it('renders', () => {
    const { container } = render(
      <CertificationCard certification={certificate.data} />,
    );
    expect(container).toMatchSnapshot();
  });
  it('open up the cert page when more info link is clicked', () => {
    render(<CertificationCard certification={certificate.data} />);
    userEvent.click(screen.getByTitle('More Info'));
    /*expect(document.querySelector('More Info')?.getAttribute('href')).toBe(
      `{/certifications/${id}}`,
    );*/
  });
});
