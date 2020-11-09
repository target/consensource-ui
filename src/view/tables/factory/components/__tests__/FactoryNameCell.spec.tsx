import React from 'react';
import { render, screen } from 'utils/testing';
import { mockFactoryRes } from 'services/api/__mocks__';
import userEvent from '@testing-library/user-event';
import { FactoryNameCell } from '../FactoryNameCell';

describe('<FactoryNameCell />', () => {
  describe('with factories', () => {
    const { data: FactoryData } = mockFactoryRes;

    it('renders', () => {
      const { container } = render(
        <FactoryNameCell name={FactoryData[0].name} id={FactoryData[0].id} />,
      );
      expect(container).toMatchSnapshot();
    });

    it('sets the link destination', () => {
      const { id } = FactoryData[0];

      render(
        <FactoryNameCell name={FactoryData[0].name} id={FactoryData[0].id} />,
      );

      expect(screen.getByRole('link')).toHaveAttribute(
        'href',
        `factories/${id}`,
      );
    });

    it('displays informational text in the tooltip', async () => {
      render(
        <FactoryNameCell name={FactoryData[0].name} id={FactoryData[0].id} />,
      );

      userEvent.hover(screen.getByTitle('View factory profile'));

      expect(
        await screen.findByText('View factory profile'),
      ).toBeInTheDocument();
    });
  });
});
