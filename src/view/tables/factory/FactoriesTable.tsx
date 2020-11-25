import React from 'react';
import qs, { ParsedQuery } from 'query-string';
import { useHistory } from 'react-router-dom';
import {
  FactoryResData,
  FactoryReqParams,
  FactoryReqFilterParams,
  SortingDir,
  PaginatedApiRes,
} from 'services/api';
import MUIDataTable, {
  debounceSearchRender,
  TableFilterList,
  MUIDataTableOptions,
  MUIDataTableFilterList,
} from 'mui-datatables';
import {
  TableTitle,
  FilterFooterButton,
  CopyTableLinkButton,
  FactoryNameCellProps,
} from './components';
import { columns } from './columns';
import {
  convertStrToArray,
  getIntValFromQueryParam,
  DEFAULT_ROWS_PER_PAGE,
  queryOpts,
} from './utils';

export interface FactoriesTableProps {
  factories: PaginatedApiRes<FactoryResData[]>;
  searchParams: ParsedQuery<string>;
}

export const textLabels: MUIDataTableOptions['textLabels'] = {
  body: {
    noMatch: 'No factories found',
  },
};

export const FactoriesTable = ({
  factories,
  searchParams,
}: FactoriesTableProps) => {
  const history = useHistory();

  const limit =
    getIntValFromQueryParam(searchParams.limit) || DEFAULT_ROWS_PER_PAGE;

  const offset = getIntValFromQueryParam(searchParams.offset) || 0;

  /**
   * Update the query string in the URL to reflect the table
   * filter state.
   */
  const updateSearchParams = (
    val: { [key in keyof FactoryReqParams]: FactoryReqParams[key] },
  ) => {
    history.push({
      search: qs.stringify({ ...searchParams, ...val }, queryOpts),
    });
  };

  /**
   * Removes the value of a given filter chip from the query string
   * in the URL.
   */
  const onFilterChipClose = (index: number, removedFilter: string) => {
    const { name: filterKey } = columns[index];
    const filterVal = searchParams[filterKey];
    if (filterVal) {
      const updatedFilter = convertStrToArray(filterVal).filter(
        (val) => val !== removedFilter,
      );
      updateSearchParams({ [filterKey]: updatedFilter });
    }
  };

  /**
   * Updates our URL query params with the list of new filter
   * values.
   */
  const onFilterConfirm = (
    filterList: MUIDataTableFilterList['filterList'],
  ) => {
    const updatedFilters = {};

    // Convert the 2d array of filters into a dictionary object
    columns.forEach(({ name }, i) => {
      Object.assign(updatedFilters, {
        [name]: filterList[i],
      });
    });

    updateSearchParams(updatedFilters);
  };

  /**
   * Return a list of table filters based on the query string
   * of the current location.
   *
   * This is needed to populate the `<TableFilterList />` component
   * with the appropriate filter chips (filters such as `head`
   * which are not in the `baseFactoryTableCols` object are excluded).
   */
  const columnFiltersFromSearchParams = columns.map(({ name: colName }) => {
    const queryVal = searchParams[colName];
    return queryVal ? convertStrToArray(queryVal) : [];
  });

  /**
   * Flattens and expands all properties of `FactoryResData`. This
   * is required because `mui-datatables` expects a flat object to
   * populate the table.
   *
   * The `certififcates` array is stringified because the filter
   * components require an array of strings as parameters. The
   * certificates can be parsed back into objects and used in
   * the filters however.
   */
  const getRow = ({ name, id, address, certificates }: FactoryResData) => {
    const factoryNameProps: FactoryNameCellProps = { name, id };
    return {
      name: factoryNameProps,
      certificates,
      ...address,
    };
  };

  return (
    <MUIDataTable
      title={<TableTitle />}
      data={factories.data.map(getRow)}
      columns={columns}
      components={{
        TableFilterList: (props) => (
          <TableFilterList
            {...props}
            filterList={columnFiltersFromSearchParams}
          />
        ),
      }}
      options={{
        onFilterConfirm,
        onFilterChipClose,
        textLabels,
        serverSide: true,
        download: false,
        print: false,
        viewColumns: false,
        page: offset / limit,
        count: factories.paging.total,
        searchText:
          typeof searchParams.search === 'string' ? searchParams.search : '',
        rowsPerPage: limit,
        selectableRows: 'none',
        searchPlaceholder: 'Search factories...',
        confirmFilters: true,
        customSearchRender: debounceSearchRender(500),
        customToolbar: () => <CopyTableLinkButton />,
        setFilterChipProps: () => {
          return {
            color: 'secondary',
            variant: 'default',
          };
        },
        customFilterDialogFooter: (currentFilterList, applyNewFilters) => (
          <FilterFooterButton applyNewFilters={applyNewFilters} />
        ),
        onChangeRowsPerPage: (val) => {
          updateSearchParams({ limit: val });
        },
        onSearchChange: (searchText) => {
          updateSearchParams({ search: searchText || undefined });
        },
        onChangePage: (page) => {
          updateSearchParams({ offset: page * limit });
        },
        onColumnSortChange: (changedColumn, direction) => {
          updateSearchParams({
            sort_key: changedColumn as keyof FactoryReqFilterParams,
            sort_dir: direction as SortingDir,
          });
        },
      }}
    />
  );
};
