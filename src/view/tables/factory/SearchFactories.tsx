import React, { useState } from 'react';
import { useAsync } from 'react-async-hook';
import {
  fetchAllFactoriesWithCerts,
  FactoryReqParams,
  FactoryReqFilterSortParams,
  FactoryResWithCertsData,
  SortingDir,
} from 'services/api';
import MUIDataTable, { MUIDataTableColumn } from 'mui-datatables';
import { Typography } from '@material-ui/core';
import {
  baseFactoryTableCols,
  DEFAULT_ROWS_PER_PAGE,
  textLabels,
  getRowFromFactory,
  FactoryProfileLinkIcon,
} from './utils';

export const SearchFactoriesTable = () => {
  const [queryParams, setQueryParams] = useState<FactoryReqParams>({});
  const { result } = useAsync(fetchAllFactoriesWithCerts, [queryParams]);

  const factoriesPage = result?.data || [];

  const columns: MUIDataTableColumn[] = [
    ...baseFactoryTableCols,
    {
      name: 'factory_page_link',
      label: ' ', // TODO: https://github.com/gregnb/mui-datatables/issues/953#issuecomment-534289311
    },
  ];

  const onFilterChange = (changedColumn: string, filterList: any[]) => {
    const colIndex = columns.findIndex(({ name }) => name === changedColumn);

    if (colIndex !== -1) {
      // TODO: How to handle cert info with multiple values
      const filterVal = filterList[colIndex][0];

      setQueryParams({
        ...queryParams,
        [changedColumn]: filterVal,
      });
    }
  };

  const onColumnSortChange = (changedColumn: string, direction: string) => {
    setQueryParams({
      ...queryParams,
      sort_key: changedColumn as keyof FactoryReqFilterSortParams,
      sort_dir: direction as SortingDir,
    });
  };

  const onChangePage = (page: number) => {
    const rowsPerPage = queryParams.limit || DEFAULT_ROWS_PER_PAGE;
    setQueryParams({ ...queryParams, offset: page * rowsPerPage });
  };

  const onChangeRowsPerPage = (rowsPerPage: number) => {
    setQueryParams({ ...queryParams, limit: rowsPerPage });
  };

  /**
   * Expands all properties of `FactoryResWithCertsData` and
   * includes the link to the factory
   */
  const getRowWithLink = (factory: FactoryResWithCertsData) => {
    return {
      ...getRowFromFactory(factory),
      factory_page_link: <FactoryProfileLinkIcon factoryId={factory.id} />,
    };
  };

  return (
    <MUIDataTable
      title={<Typography variant="h4">Factories</Typography>}
      data={factoriesPage.map(getRowWithLink)}
      columns={columns}
      options={{
        /**
         * This option removes the ability to perform pagination, filtering, and sorting
         * on the UI and pushes that logic to the server.
         *
         * [MUI Datatable Docs](https://github.com/gregnb/mui-datatables#remote-data)
         */
        serverSide: true,
        /**
         * Remove paper elevation to allow parent components more flexibility
         */
        elevation: 0,
        /**
         * Since `serverSide` is enabled, we need to manually
         *  track the factories count
         */
        count: result?.paging?.total ?? 0,
        /**
         * Prevent rows from being selectable (default action is to delete rows, which we don't allow)
         */
        selectableRows: 'none',
        textLabels,
        onFilterChange,
        onChangePage,
        onChangeRowsPerPage,
        onColumnSortChange,
      }}
    />
  );
};
