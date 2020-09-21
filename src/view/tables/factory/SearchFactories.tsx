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
import MUIDataTable, {
  MUIDataTableColumn,
  debounceSearchRender,
  TableFilterList,
  MUIDataTableFilterList,
} from 'mui-datatables';

import {
  LoadingWithMinDisplay,
  SpinnerWithLabel,
  WarningIconError,
} from 'view/components';
import { useDecodedQueryString } from 'services/hooks';
import { FactoryProfileLinkIcon } from './FactoryProfileLinkIcon';
import { TableTitle } from './TableTitle';
import { FilterFooterButton } from './FilterFooterButton';
import { baseFactoryTableCols } from './columns';
import {
  textLabels,
  getRowFromFactory,
  filterChipProps,
  baseParams,
  getFilterListFromQueryParams,
  DEFAULT_ROWS_PER_PAGE,
} from './utils';

export const SearchFactoriesTable = () => {
  const history = useHistory();
  const queryParams =
    useDecodedQueryString({ parseNumbers: true, arrayFormat: 'comma' }) ||
    baseParams;

  // TODO: specifying the `certificates` value is a hack until we determine
  // the formatting of the query string on the backend
  const { data, isLoading, error } = useQuery(
    ['fetchAllFactories', { ...queryParams, certificates: '' }],
    (key, params) => fetchAllFactories(params as FactoryReqParams),
  );

  /**
   * Update the query string to reflect the table filter/sorting state
   */
  const updateQueryParams = (newParams: FactoryReqParams) => {
    history.push({
      search: qs.stringify(newParams, { skipNull: true, arrayFormat: 'comma' }),
    });
  };

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

  const onFilterChange = (
    changedColumn: MUIDataTableColumn | string,
    filterList: MUIDataTableFilterList['filterList'],
  ) => {
    const colName =
      typeof changedColumn === 'string' ? changedColumn : changedColumn.name;

    const changedColIndex = columns.findIndex(({ name }) => name === colName);

    const filterVal = filterList[changedColIndex].join(',') || undefined;

    updateQueryParams({
      ...queryParams,
      [colName]: filterVal,
    });
  };

  /**
   * Expands all properties of `FactoryResWithCertsData` and
   * includes the link to the factory
   */
  const getRowWithLink = (factory: FactoryResData) => {
    return {
      ...getRowFromFactory(factory),
      factory_page_link: <FactoryProfileLinkIcon factoryId={factory.id} />,
    };
  };

  return (
    <LoadingWithMinDisplay
      isLoading={isLoading}
      waitTimeMs={1000}
      loadingIndicator={<SpinnerWithLabel label="Loading factories..." />}
    >
      {error && (
        <WarningIconError typeVariant="h5" iconFontSize="large">
          Failed to load factories
        </WarningIconError>
      )}
      {data && (
        <MUIDataTable
          title={<TableTitle />}
          data={data.data.map(getRowWithLink)}
          columns={columns}
          components={{
            TableFilterList: (props) => (
              <TableFilterList
                {...props}
                filterList={getFilterListFromQueryParams()}
              />
            ),
          }}
          options={{
            textLabels,
            onFilterChange,
            serverSide: true,
            download: false,
            count: data.paging.total,
            searchText:
              typeof queryParams.address === 'string'
                ? queryParams.address
                : '',
            rowsPerPage:
              typeof queryParams.limit === 'number'
                ? queryParams.limit
                : DEFAULT_ROWS_PER_PAGE,
            selectableRows: 'none',
            searchPlaceholder: 'Search by name, certifications...',
            searchOpen: true,
            confirmFilters: true,
            customSearchRender: debounceSearchRender(500),
            setFilterChipProps: () => filterChipProps,
            onSearchClose: () => {
              updateQueryParams({ ...queryParams, address: undefined });
            },
            customFilterDialogFooter: (currentFilterList, applyNewFilters) => (
              <FilterFooterButton applyNewFilters={applyNewFilters} />
            ),
            onSearchChange: (searchText) => {
              updateQueryParams({ ...queryParams, address: searchText });
            },
            onChangePage: (page) => {
              updateQueryParams({
                ...queryParams,
                offset:
                  page *
                  (typeof queryParams.limit === 'number'
                    ? queryParams.limit
                    : DEFAULT_ROWS_PER_PAGE),
              });
            },
            onChangeRowsPerPage: (rowsPerPage) => {
              updateQueryParams({ ...queryParams, limit: rowsPerPage });
            },
            onColumnSortChange: (changedColumn, direction) => {
              updateQueryParams({
                ...queryParams,
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
