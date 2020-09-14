import React from 'react';
import { useQuery } from 'react-query';
import { fetchAllFactories, FactoryResData } from 'services/api';
import MUIDataTable, {
  MUIDataTableColumn,
  debounceSearchRender,
} from 'mui-datatables';
import {
  LoadingWithMinDisplay,
  SpinnerWithLabel,
  WarningIconError,
} from 'view/components';
import { FactoryProfileLinkIcon } from './FactoryProfileLinkIcon';
import { TableTitle } from './TableTitle';
import { FilterFooterButton } from './FilterFooterButton';
import {
  baseFactoryTableCols,
  textLabels,
  getRowFromFactory,
  filterChipProps,
} from './utils';

export const SearchFactoriesTable = () => {
  // TODO: Remove limit param when backend is updated
  const { data, isLoading, error } = useQuery('fetchAllFactories', () =>
    fetchAllFactories({ limit: 100000, expand: true }),
  );

  const columns: MUIDataTableColumn[] = [
    ...baseFactoryTableCols,
    {
      name: 'factory_page_link',
      options: { empty: true, download: false },
      label: ' ', // TODO: https://github.com/gregnb/mui-datatables/issues/953#issuecomment-534289311
    },
  ];

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
          options={{
            textLabels,
            selectableRows: 'none',
            searchPlaceholder: 'Search for factories',
            searchOpen: true,
            confirmFilters: true,
            customSearchRender: debounceSearchRender(500),
            setFilterChipProps: () => filterChipProps,
            customFilterDialogFooter: (currentFilterList, applyNewFilters) => (
              <FilterFooterButton applyNewFilters={applyNewFilters} />
            ),
          }}
        />
      )}
    </LoadingWithMinDisplay>
  );
};
