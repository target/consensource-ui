import React from 'react';
import { mockFactoryResWithCerts } from 'services/api/__mocks__';
import { render, screen, act } from 'utils/testing';
import userEvent from '@testing-library/user-event';
import { FactoryResData, PaginatedApiRes } from 'services/api';
import { FactoriesTable, textLabels } from '..';
import { columns, DEFAULT_CELL_VALUE } from '../columns';
import { FILTER_TIMEOUT_MS } from '../components';

// Mocked since it makes an api call to populate the multiselect
jest.mock('../components/filtering/CertificationsMultiselect', () => {
  return {
    CertificationsMultiselect: () => <div />,
  };
});

const mockHistoryPush = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: () => ({
    push: mockHistoryPush,
  }),
}));

describe('<FactoriesTable />', () => {
  const mockFactories: PaginatedApiRes<
    FactoryResData[]
  > = mockFactoryResWithCerts as any;

  describe('general', () => {
    it('renders an empty table', () => {
      render(
        <FactoriesTable
          factories={{ ...mockFactories, data: [] }}
          searchParams={{}}
        />,
      );

      expect(
        screen.getByText(textLabels!.body!.noMatch! as any),
      ).toBeInTheDocument();
    });

    it('renders a table with data', async () => {
      render(<FactoriesTable factories={mockFactories} searchParams={{}} />);
      expect(screen.getByTestId('MUIDataTableBodyRow-0')).toBeInTheDocument();
    });

    it('renders a default text value for empty fields', async () => {
      render(
        <FactoriesTable
          factories={{ ...mockFactories, data: [{}] } as any}
          searchParams={{}}
        />,
      );

      const firstRow = screen.getByTestId('MuiDataTableBodyCell-4-0');
      const dataCell = firstRow.childNodes[1];

      expect(dataCell.textContent).toBe(DEFAULT_CELL_VALUE);
    });

    it('sets pagination controls and total factory count', () => {
      const limit = 10;
      const offset = 20;
      const total = 40;

      // Search params are parsed as strings in the component
      const searchParams = {
        offset: offset.toString(),
        limit: limit.toString(),
      };

      render(
        <FactoriesTable
          factories={{ ...mockFactories, paging: { total } } as any}
          searchParams={searchParams}
        />,
      );

      const paginationControl = screen.getByTestId('pagination-rows');

      expect(paginationControl.firstChild?.nodeValue).toEqual(limit.toString());
      expect(
        screen.getByText(`${offset + 1}-${offset + limit} of ${total}`),
      ).toBeInTheDocument();
    });
  });

  describe('search bar', () => {
    it('renders as closed by default', () => {
      expect(screen.queryByTitle('Search')).toBe(null);
    });

    it('renders placeholder text', () => {
      render(<FactoriesTable factories={mockFactories} searchParams={{}} />);

      userEvent.click(screen.getByTitle('Search'));
      expect(
        screen.getByPlaceholderText('Search by name, certifications...'),
      ).toBeInTheDocument();
    });

    it('sets the search text to the search params address string', () => {
      const address = 'address';

      render(
        <FactoriesTable factories={mockFactories} searchParams={{ address }} />,
      );

      userEvent.click(screen.getByTitle('Search'));
      expect(screen.getByDisplayValue(address)).toBeInTheDocument();
    });

    it('sets the search text to an empty string if search params address is not a string', async () => {
      const address = ['foo', 'bar'];

      render(
        <FactoriesTable factories={mockFactories} searchParams={{ address }} />,
      );

      userEvent.click(screen.getByTitle('Search'));
      expect(screen.getByDisplayValue('')).toBeInTheDocument();
    });
  });

  describe('filtering', () => {
    const { name: validFilterName, label: validFilterLabel } = columns[5];
    const filterVal = 'foo';

    it('renders', () => {
      render(<FactoriesTable factories={mockFactories} searchParams={{}} />);

      userEvent.click(screen.getByTitle('Filter Table'));
      const container = screen.getByRole('presentation');

      expect(container).toMatchSnapshot();
    });

    // The only filters that we display as a filter chip are those
    // that have a display column. For example, `limit` is a valid
    // query param, but we don't display a filter chip since it is
    // displayed in the table footer.
    it('renders a filter chip from valid search params', () => {
      render(
        <FactoriesTable
          factories={mockFactories}
          searchParams={{ [validFilterName]: filterVal }}
        />,
      );

      expect(
        screen.getByText(`${validFilterLabel}: ${filterVal}`),
      ).toBeInTheDocument();
    });

    it('does not render a filter chip from invalid search params', () => {
      const invalidFilterName = 'invalid_fitestlter';

      render(
        <FactoriesTable
          factories={mockFactories}
          searchParams={{ [invalidFilterName]: filterVal }}
        />,
      );

      expect(screen.queryByText(`${invalidFilterName}: ${filterVal}`)).toBe(
        null,
      );
    });

    it('renders multiple filter chips for multiple filter values', () => {
      const filterVal1 = 'foo';
      const filterVal2 = 'bar';

      render(
        <FactoriesTable
          factories={mockFactories}
          searchParams={{
            [validFilterName]: [filterVal1, filterVal2],
          }}
        />,
      );

      expect(
        screen.getByText(`${validFilterLabel}: ${filterVal1}`),
      ).toBeInTheDocument();
      expect(
        screen.getByText(`${validFilterLabel}: ${filterVal2}`),
      ).toBeInTheDocument();
    });

    it('updates the query string when a filter chip is removed', () => {
      render(
        <FactoriesTable
          factories={mockFactories}
          searchParams={{ [validFilterName]: filterVal }}
        />,
      );

      const filterChip = screen.getByText(`${validFilterLabel}: ${filterVal}`);
      userEvent.click(filterChip.nextSibling as any);

      expect(mockHistoryPush).toHaveBeenCalledWith({
        search: '',
      });
    });

    it('updates the query string when a new filter is applied', () => {
      jest.useFakeTimers();

      render(<FactoriesTable factories={mockFactories} searchParams={{}} />);

      userEvent.click(screen.getByTitle('Filter Table'));
      userEvent.type(screen.getByLabelText(validFilterLabel as any), filterVal);
      userEvent.click(screen.getByTitle('apply filters'));

      act(() => {
        jest.advanceTimersByTime(FILTER_TIMEOUT_MS);
      });

      expect(mockHistoryPush).toHaveBeenCalledWith({
        search: `${validFilterName}=${filterVal}`,
      });
    });
  });

  describe('sorting', () => {
    const { name: sortColName } = columns[2];

    it('when single clicking a column header, sets the query string to ascending for the column', () => {
      render(<FactoriesTable factories={mockFactories} searchParams={{}} />);
      userEvent.click(screen.getByTestId('headcol-2'));

      expect(mockHistoryPush).toHaveBeenCalledWith({
        search: `sort_dir=asc&sort_key=${sortColName}`,
      });
    });

    it('when double clicking a column header, sets the query string to descending for the column', () => {
      render(<FactoriesTable factories={mockFactories} searchParams={{}} />);
      userEvent.click(screen.getByTestId('headcol-2'));
      userEvent.click(screen.getByTestId('headcol-2'));

      expect(mockHistoryPush).toHaveBeenCalledWith({
        search: `sort_dir=desc&sort_key=${sortColName}`,
      });
    });
  });
});
