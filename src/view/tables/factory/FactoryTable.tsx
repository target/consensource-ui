import React, { useState } from 'react';
import { useAsync } from 'react-async-hook';
import {
  fetchAllFactoriesWithCerts,
  FactoryReqParams,
  FactoryReqFilterSortParams,
  CertResData,
  FactoryResWithCertsData,
} from 'services/api';
import MUIDataTable, {
  MUIDataTableOptions,
  MUIDataTableColumn,
} from 'mui-datatables';
import { Typography } from '@material-ui/core';
import { FactoryProfileLinkIcon } from './FactoryProfileLinkIcon';

export const DEFAULT_ROWS_PER_PAGE = 15;

export const textLabels: MUIDataTableOptions['textLabels'] = {
  body: {
    noMatch: 'No factories found',
  },
};

export function FactoriesTable() {
  const [queryParams, setQueryParams] = useState<FactoryReqParams>({});
  const { result } = useAsync(fetchAllFactoriesWithCerts, [queryParams]);

  const factoriesPage = result?.data || [];

  /**
   * Get the render element for the `Certificates` cell in our table.
   * If the factory has certificates, display them as an unordered list.
   */
  const getCertCell = (certificates?: CertResData[]) => {
    if (certificates) {
      const certsList = certificates.map(({ standard_name }) => (
        <li>{standard_name}</li>
      ));

      return <ul>{certsList}</ul>;
    }

    return null;
  };

  const columns: MUIDataTableColumn[] = [
    { name: 'name', label: 'Name', options: { filterType: 'textField' } },
    {
      name: 'certificates',
      label: 'Certifications',
      options: {
        customBodyRender: getCertCell,
      },
    },
    {
      name: 'street_line_1',
      label: 'Street Line 1',
      options: { filterType: 'textField' },
    },
    {
      name: 'street_line_2',
      label: 'Street Line 2',
      options: { filterType: 'textField' },
    },
    {
      name: 'city',
      label: 'City',
      options: {
        filterType: 'textField',
      },
    },
    {
      name: 'state_province',
      label: 'State/Province',
      options: { filterType: 'textField' },
    },
    { name: 'country', label: 'Country', options: { filterType: 'dropdown' } },
    {
      name: 'postal_code',
      label: 'Postal Code',
      options: { filterType: 'textField' },
    },
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
      sort_dir: direction,
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
   * Expands all properties of `FactoryResWithCertsData`
   */
  const getRowFromFactory = ({
    id,
    name,
    address,
    certificates,
  }: FactoryResWithCertsData) => {
    return {
      name,
      certificates,
      factory_page_link: <FactoryProfileLinkIcon factoryId={id} />,
      ...address,
    };
  };

  return (
    <MUIDataTable
      title={<Typography variant="h4">Factories</Typography>}
      data={factoriesPage.map(getRowFromFactory)}
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
}
