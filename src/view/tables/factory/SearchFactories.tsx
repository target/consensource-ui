import React, { useState, useEffect } from 'react';
import qs from 'query-string';
import { useQuery } from 'react-query';
import { useHistory, useLocation } from 'react-router-dom';
import {
  fetchAllFactories,
  FactoryResData,
  FactoryReqParams,
  FactoryReqFilterSortParams,
  SortingDir,
} from 'services/api';
import MUIDataTable, { MUIDataTableColumn } from 'mui-datatables';
import { FactoryProfileLinkIcon } from './FactoryProfileLinkIcon';
import { FailedToLoadError } from './FailedToLoadError';
import { TableTitle } from './TableTitle';
import {
  baseFactoryTableCols,
  DEFAULT_ROWS_PER_PAGE,
  textLabels,
  getRowFromFactory,
} from './utils';

export const SearchFactoriesTable = () => {
  const history = useHistory();
  const location = useLocation();
  const [queryParams, setQueryParams] = useState<FactoryReqParams>({});

  const { data, isLoading, error } = useQuery(
    ['fetchAllFactories', queryParams],
    (key, params: FactoryReqParams) => fetchAllFactories(params),
  );

  /**
   * Performs two updates:
   *   1. Updates the URL query params
   *   2. Updates the `queryParams` state object
   */
  const updateQueryParams = (newParams: FactoryReqParams) => {
    history.push({ search: qs.stringify(newParams, { skipNull: true }) });
    setQueryParams(newParams);
  };

  /**
   * If the route contains a query string, parse the query
   * and update the search params. Else, update the search
   * params with our base params.
   */
  const initQueryParams = () => {
    const baseParams = {
      expand: true,
      limit: DEFAULT_ROWS_PER_PAGE,
    };

    if (location.search) {
      updateQueryParams(qs.parse(location.search));
    } else {
      updateQueryParams(baseParams);
    }
  };

  useEffect(() => {
    initQueryParams();
  }, []);

  const columns: MUIDataTableColumn[] = [
    ...baseFactoryTableCols,
    {
      name: 'factory_page_link',
      options: { empty: true },
      label: ' ', // TODO: https://github.com/gregnb/mui-datatables/issues/953#issuecomment-534289311
    },
  ];

  const onFilterChange = (changedColumn: string, filterList: any[]) => {
    const colIndex = columns.findIndex(({ name }) => name === changedColumn);
    // TODO: How to handle cert info with multiple values
    const filterVal = filterList[colIndex][0];

    updateQueryParams({
      ...queryParams,
      [changedColumn]: filterVal,
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

  if (error) {
    return <FailedToLoadError />;
  }

  return (
    <MUIDataTable
      title={<TableTitle />}
      data={data?.data.map(getRowWithLink) || []}
      columns={columns}
      options={{
        /**
         * This option removes the ability to perform pagination, filtering, and sorting
         * on the UI and pushes that logic to the server.
         */
        serverSide: true,
        /**
         * Prevent rows from being selectable (default action is to delete rows, which we don't allow)
         */
        selectableRows: 'none',
        searchPlaceholder: 'Search for factories',
        searchOpen: true,
        count: data?.paging.total,
        searchText: queryParams.address,
        rowsPerPage: queryParams.limit,
        textLabels,
        onFilterChange,
        onSearchChange: (searchText) => {
          updateQueryParams({ ...queryParams, address: searchText });
        },
        onChangePage: (page) => {
          updateQueryParams({
            ...queryParams,
            offset: page * (queryParams.limit || DEFAULT_ROWS_PER_PAGE),
          });
        },
        onChangeRowsPerPage: (rowsPerPage) => {
          updateQueryParams({ ...queryParams, limit: rowsPerPage });
        },
        onColumnSortChange: (changedColumn, direction) => {
          updateQueryParams({
            ...queryParams,
            sort_key: changedColumn as keyof FactoryReqFilterSortParams,
            sort_dir: direction as SortingDir,
          });
        },
      }}
    />
  );
};
