import React, { useState, useEffect } from 'react';
import {
  FactoryResData,
  fetchAllFactories,
  FactoryReqParams,
  FactoryReqFilterSortParams,
} from 'services/api/factory';
import MUIDataTable, {
  MUIDataTableOptions,
  MUIDataTableColumn,
} from 'mui-datatables';
import stores from 'stores';
import { CertResData } from 'services/api/certificate';

export function FactoriesTable() {
  const DEFAULT_ROWS_PER_PAGE = 15;

  /**
   * This option removes the ability to perform pagination, filtering, and sorting
   * on the UI and pushes that logic to the server.
   *
   * [MUI Datatable Docs](https://github.com/gregnb/mui-datatables#remote-data)
   */
  const serverSide = true;

  // Since `serverSide` is enabled, we need to manually
  // track the factories count
  const [count, setCount] = useState(0);

  const [factoriesPage, setFactoriesPage] = useState<FactoryResData[]>([]);
  const [queryParams, setQueryParams] = useState<FactoryReqParams>({});

  /**
   * Get the render element for the `Certificates` cell in our table.
   * If the factory has an certificates, display them as an unordered list.
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
  ];

  const textLabels: MUIDataTableOptions['textLabels'] = {
    body: {
      noMatch: 'No factories found',
    },
  };

  useEffect(() => {
    const updateFactoriesTable = async (params: FactoryReqParams) => {
      try {
        const { data, paging } = await fetchAllFactories(params);
        setCount(paging.total);
        setFactoriesPage(data);
      } catch ({ message }) {
        console.error(message);

        // TODO: snackbarStore currently only work within the <Layout /> component,
        // and this table is not rendered in that default layout
        stores.snackbarStore.open('There was an issue loading factories');
      }
    };

    updateFactoriesTable(queryParams);
  }, [queryParams]);

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
   * Expands all properties of `FactoryResData`
   */
  const getRowFromFactory = ({
    name,
    address,
    certificates,
  }: FactoryResData) => {
    return {
      name,
      certificates,
      ...address,
    };
  };

  return (
    <MUIDataTable
      title={<h1>Factories</h1>}
      data={factoriesPage.map(getRowFromFactory)}
      columns={columns}
      options={{
        count,
        serverSide,
        textLabels,
        onFilterChange,
        onChangePage,
        onChangeRowsPerPage,
        onColumnSortChange,
      }}
    />
  );
}
