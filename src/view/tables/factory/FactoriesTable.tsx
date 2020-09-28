import React from 'react';
import qs from 'query-string';
import { useQuery } from 'react-query';
import { useHistory } from 'react-router-dom';
import {
  fetchAllFactories,
  FactoryResData,
  FactoryReqParams,
  FactoryReqFilterParams,
  SortingDir,
} from 'services/api';
import { useSearchQuery } from 'services/hooks';
import MUIDataTable, {
  MUIDataTableColumn,
  debounceSearchRender,
  TableFilterList,
  MUIDataTableFilterList,
} from 'mui-datatables';
import {
  LoadingWithMinDisplay,
  FullScreenSpinnerWithLabel,
  WarningIconError,
} from 'view/components';
import {
  FactoryProfileLinkIcon,
  TableTitle,
  FilterFooterButton,
} from './components';
import { baseFactoryTableCols } from './columns';
import { convertStrToArray, DEFAULT_ROWS_PER_PAGE, queryOpts } from './utils';

export const FactoriesTable = () => {
  const history = useHistory();
  const queryParams = useSearchQuery(queryOpts);

  /**
   * Note that when parsing query params, we do not have a
   * guarantee that all params passed to `fetchAllFactories`
   * will be a key/val of `FactoryReqParams`. The API is
   * responsible for filtering out invalid params.
   */
  const { data, isLoading, error } = useQuery(
    ['fetchAllFactories', queryParams],
    (key, params) => fetchAllFactories(params as any),
  );

  const columns: MUIDataTableColumn[] = [
    ...baseFactoryTableCols,
    {
      name: 'factory_page_link',
      label: ' ', // TODO: https://github.com/gregnb/mui-datatables/issues/953#issuecomment-534289311
      options: {
        empty: true,
        download: false,
        filter: false,
      },
    },
  ];

  const limit = queryParams.limit
    ? parseInt(convertStrToArray(queryParams.limit)[0], 10) ||
      DEFAULT_ROWS_PER_PAGE
    : DEFAULT_ROWS_PER_PAGE;

  /**
   * Update the query string in the URL to reflect the table
   * filter state.
   */
  const updateQueryParams = (
    val: { [key in keyof FactoryReqParams]: FactoryReqParams[key] },
  ) => {
    console.log({ ...queryParams, ...val });
    console.log(qs.stringify({ ...queryParams, ...val }, queryOpts));
    history.push({
      search: qs.stringify({ ...queryParams, ...val }, queryOpts),
    });
  };

  /**
   * Removes the value of a given filter chip from the query string
   * in the URL.
   */
  const onFilterChipClose = (index: number, removedFilter: string) => {
    const filterKey = baseFactoryTableCols[index].name;
    const filterVal = queryParams[filterKey];

    if (filterVal) {
      const updatedFilter = convertStrToArray(filterVal).filter(
        (val) => val !== removedFilter,
      );
      updateQueryParams({ [filterKey]: updatedFilter });
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
    baseFactoryTableCols.forEach(({ name }, i) => {
      Object.assign(updatedFilters, {
        [name]: filterList[i],
      });
    });

    updateQueryParams(updatedFilters);
  };

  /**
   * Return a list of table filters based on the query string
   * of the current location.
   *
   * This is needed to populate the `<TableFilterList />` component
   * with the appropriate filter chips (filters such as `head`
   * which are not in the `baseFactoryTableCols` object are excluded).
   */
  const columnFiltersFromQueryParams = baseFactoryTableCols.map(
    ({ name: colName }) => {
      const queryVal = queryParams[colName];
      return queryVal ? convertStrToArray(queryVal) : [];
    },
  );

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
    return {
      name,
      certificates: JSON.stringify(certificates),
      factory_page_link: <FactoryProfileLinkIcon factoryId={id} />,
      ...address,
    };
  };

  return (
    <LoadingWithMinDisplay
      isLoading={isLoading}
      waitTimeMs={1000}
      loadingIndicator={
        <FullScreenSpinnerWithLabel label="Loading factories..." />
      }
    >
      {error && (
        <WarningIconError typeVariant="h5" iconFontSize="large">
          Failed to load factories
        </WarningIconError>
      )}
      {data && (
        <MUIDataTable
          title={<TableTitle />}
          data={data.data.map(getRow)}
          columns={columns}
          components={{
            TableFilterList: (props) => (
              <TableFilterList
                {...props}
                filterList={columnFiltersFromQueryParams}
              />
            ),
          }}
          options={{
            onFilterConfirm,
            onFilterChipClose,
            serverSide: true,
            download: false,
            print: false,
            viewColumns: false,
            count: data.paging.total,
            searchText:
              typeof queryParams.address === 'string'
                ? queryParams.address
                : '',
            rowsPerPage: limit,
            selectableRows: 'none',
            searchPlaceholder: 'Search by name, certifications...',
            confirmFilters: true,
            customSearchRender: debounceSearchRender(500),
            textLabels: {
              body: {
                noMatch: 'No factories found',
              },
            },
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
              updateQueryParams({ limit: val });
            },
            onSearchChange: (searchText) => {
              updateQueryParams({ address: searchText || undefined });
            },
            onChangePage: (page) => {
              updateQueryParams({ offset: page * limit });
            },
            onColumnSortChange: (changedColumn, direction) => {
              updateQueryParams({
                sort_key: changedColumn as keyof FactoryReqFilterParams,
                sort_dir: direction as SortingDir,
              });
            },
          }}
        />
      )}
    </LoadingWithMinDisplay>
  );
};
