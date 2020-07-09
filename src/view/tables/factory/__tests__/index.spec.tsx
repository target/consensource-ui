import React from 'react';
import {
  FactoriesTable,
  DEFAULT_ROWS_PER_PAGE,
  textLabels,
} from 'view/tables/factory';
import { mockFactoryRes } from 'services/api/__tests__/__mocks__/factory';
import {
  render,
  waitFor,
  screen,
  fireEvent,
  getByDisplayValue,
  waitForElementToBeRemoved,
  act,
  getByText,
} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import * as FactoryApi from 'services/api/factory';

describe('<FactoriesTable />', () => {
  const loadingText = textLabels!.body!.noMatch!;

  const waitForTableRender = async () => {
    await act(async () => {
      render(<FactoriesTable />);
      await waitForElementToBeRemoved(() =>
        screen.getByText('No factories found'),
      );
    });
  };

  it('renders an empty table', () => {
    jest.spyOn(FactoryApi, 'fetchAllFactories').mockResolvedValue({} as any);

    render(<FactoriesTable />);
    expect(screen.getByText(loadingText)).toBeInTheDocument();
  });

  it('renders a table with data', async () => {
    const name = 'Test Org';

    jest
      .spyOn(FactoryApi, 'fetchAllFactories')
      .mockResolvedValue({ ...mockFactoryRes, data: [{ name }] } as any);

    await waitForTableRender();
  });

  it('sets the count for the number of records', async () => {
    const total = 2;

    jest.spyOn(FactoryApi, 'fetchAllFactories').mockResolvedValue({
      ...mockFactoryRes,
      paging: { total },
    } as any);

    await waitForTableRender();

    await waitFor(() =>
      expect(screen.getByText(`1-${total} of ${total}`)).toBeInTheDocument(),
    );
  });

  it('updates query params based on sorting', async () => {
    const fetchSpy = jest
      .spyOn(FactoryApi, 'fetchAllFactories')
      .mockResolvedValue(mockFactoryRes as any);

    await waitForTableRender();

    // First column is `name`
    const col = screen.getByTestId('headcol-0');
    fireEvent.click(col);

    expect(fetchSpy).toHaveBeenCalledWith({
      sort_key: 'name',
      sort_dir: 'asc',
    });
  });

  it('updates query params based on filters', async () => {
    const fetchSpy = jest
      .spyOn(FactoryApi, 'fetchAllFactories')
      .mockResolvedValue(mockFactoryRes as any);

    await waitForTableRender();

    // Open filter list
    fireEvent.click(screen.getByTestId('Filter Table-iconButton'));

    // Filter on the `name` field
    const nameDiv = screen.getByTestId('filtertextfield-name');
    const nameInput = getByDisplayValue(nameDiv, '');
    fireEvent.change(nameInput, { target: { value: 'test' } });

    expect(fetchSpy).toHaveBeenCalledWith({ name: 'test' });
  });

  it('updates query params based on current page', async () => {
    // Create more records than can be held on a single page
    const mockFactoryResExpanded = { data: [] } as any;
    for (let i = 0; i < DEFAULT_ROWS_PER_PAGE + 1; i++) {
      mockFactoryResExpanded.data.push(mockFactoryRes.data[0]);
    }

    const fetchSpy = jest
      .spyOn(FactoryApi, 'fetchAllFactories')
      .mockResolvedValue(mockFactoryResExpanded as any);

    await waitForTableRender();

    fireEvent.click(screen.getByTitle('Next page'));

    // Zero-indexed paging
    const page = 1;

    expect(fetchSpy).toHaveBeenCalledWith({
      offset: page * DEFAULT_ROWS_PER_PAGE,
    });
  });

  it('updates query params based on rows per page', async () => {
    const fetchSpy = jest
      .spyOn(FactoryApi, 'fetchAllFactories')
      .mockResolvedValue(mockFactoryRes as any);

    await waitForTableRender();

    const limit = 100;

    fireEvent.mouseDown(screen.getByTestId('pagination-rows'));

    const rowOpts = await screen.findByTestId('pagination-menu-list');
    fireEvent.click(getByText(rowOpts, limit.toString()));

    expect(fetchSpy).toHaveBeenCalledWith({ limit });
  });
});
