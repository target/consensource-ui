import React from 'react';
import { mockFactoryResWithCerts } from 'services/api/__tests__/__mocks__';
import {
  render,
  screen,
  fireEvent,
  getByDisplayValue,
  waitForElementToBeRemoved,
  act,
  getByText,
} from '@testing-library/react';
import * as FactoryApi from 'services/api/factory';
import { DEFAULT_ROWS_PER_PAGE, textLabels } from '../utils';
import { SearchFactoriesTable } from '..';

describe('<SearchFactoriesTable />', () => {
  const loadingText = textLabels!.body!.noMatch!;

  const waitForTableRender = async () => {
    await act(async () => {
      render(<SearchFactoriesTable />);
      await waitForElementToBeRemoved(() => screen.getByText(loadingText));
    });
  };

  it('renders an empty table', () => {
    jest
      .spyOn(FactoryApi, 'fetchAllFactoriesWithCerts')
      .mockReturnValue({} as any);
    render(<SearchFactoriesTable />);
    expect(screen.getByText(loadingText)).toBeInTheDocument();
  });

  it.only('renders a table with data', async () => {
    jest
      .spyOn(FactoryApi, 'fetchAllFactoriesWithCerts')
      .mockReturnValue(mockFactoryResWithCerts as any);

    await waitForTableRender();
  });

  it('sets the count for the number of records', async () => {
    const total = 2;

    jest.spyOn(FactoryApi, 'fetchAllFactoriesWithCerts').mockReturnValue({
      ...mockFactoryResWithCerts,
      paging: { total },
    } as any);

    await waitForTableRender();

    expect(screen.getByText(`1-${total} of ${total}`)).toBeInTheDocument();
  });

  describe('updates query params based on...', () => {
    it('sorting', async () => {
      const fetchSpy = jest
        .spyOn(FactoryApi, 'fetchAllFactoriesWithCerts')
        .mockReturnValue(mockFactoryResWithCerts as any);

      await waitForTableRender();

      // First column is `name`
      fireEvent.click(screen.getByTestId('headcol-0'));

      expect(fetchSpy).toHaveBeenCalledWith({
        sort_key: 'name',
        sort_dir: 'asc',
      });
    });

    it('filters', async () => {
      const fetchSpy = jest
        .spyOn(FactoryApi, 'fetchAllFactoriesWithCerts')
        .mockReturnValue(mockFactoryResWithCerts as any);

      await waitForTableRender();

      // Open filter list
      fireEvent.click(screen.getByTestId('Filter Table-iconButton'));

      // Filter on the `name` field
      const nameDiv = screen.getByTestId('filtertextfield-name');
      const nameInput = getByDisplayValue(nameDiv, '');
      fireEvent.change(nameInput, { target: { value: 'test' } });

      expect(fetchSpy).toHaveBeenCalledWith({ name: 'test' });
    });

    it('current page', async () => {
      // Create more records than can be held on a single page
      const mockFactoryResExpanded = { data: [] } as any;
      for (let i = 0; i < DEFAULT_ROWS_PER_PAGE + 1; i++) {
        mockFactoryResExpanded.data.push(mockFactoryResWithCerts.data[0]);
      }

      const fetchSpy = jest
        .spyOn(FactoryApi, 'fetchAllFactoriesWithCerts')
        .mockReturnValue(mockFactoryResExpanded as any);

      await waitForTableRender();

      fireEvent.click(screen.getByTitle('Next page'));

      // Zero-indexed paging
      const page = 1;

      expect(fetchSpy).toHaveBeenCalledWith({
        offset: page * DEFAULT_ROWS_PER_PAGE,
      });
    });

    it('rows per page', async () => {
      const fetchSpy = jest
        .spyOn(FactoryApi, 'fetchAllFactoriesWithCerts')
        .mockReturnValue(mockFactoryResWithCerts as any);

      await waitForTableRender();

      const limit = 100;

      fireEvent.mouseDown(screen.getByTestId('pagination-rows'));

      const rowOpts = await screen.findByTestId('pagination-menu-list');
      fireEvent.click(getByText(rowOpts, limit.toString()));

      expect(fetchSpy).toHaveBeenCalledWith({ limit });
    });
  });
});
