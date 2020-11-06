import React from 'react';
import { MUIDataTableColumn, MUIDataTableColumnOptions } from 'mui-datatables';
import {
  FilterTextField,
  FilterMultiselect,
  CertificationsMultiselect,
  CertificatesCell,
  FactoryNameCell,
} from './components';

export const DEFAULT_CELL_VALUE = '-';
/**
 * Used in the `customBodyRender` config. If an empty string is passed,
 * replace it with a placeholder text (`'-'`).
 */
export const getCellValOrDefault = (value: string) =>
  value || DEFAULT_CELL_VALUE;

/**
 * Return the string value for the filter chips displayed
 * in the `<TableFilterList />`.
 *
 * For columns with a single filter value, a single string is passed.
 *
 * For columns with a multiselect (or custom columns), an array of
 * strings is passed.
 *
 */
export const getCustomFilterChipLabel = (
  colLabel: string,
  values: string | string[],
) => {
  const getLabel = (val: string) => `${colLabel}: ${val}`;

  return typeof values === 'string' ? getLabel(values) : values.map(getLabel);
};

/**
 * Configuration for a custom search filter.
 */
export const getCustomSearchOptions = (
  colLabel: string,
): MUIDataTableColumnOptions => ({
  filter: true,
  filterType: 'custom',
  customBodyRender: getCellValOrDefault,
  customFilterListOptions: {
    render: (value) => getCustomFilterChipLabel(colLabel, value),
  },
  filterOptions: {
    display: (filterList, onChange, index, column) => {
      return (
        <FilterTextField
          filterVal={filterList[index]}
          queryKey={column.name}
          label={colLabel}
          onChange={(val) => onChange(val, index, column)}
        />
      );
    },
  },
});

/**
 * Configuration for our custom certificate filtering logic.
 */
export const nameColumnOptions: MUIDataTableColumn['options'] = {
  sort: false,
  filterType: 'custom',
  // TODO: Verify with real cert data below
  customBodyRender: ({ name, id }: any) => (
    <FactoryNameCell name={name} id={id} />
  ),
  customFilterListOptions: {
    render: ({ name }: any) => getCustomFilterChipLabel('Name', name),
  },
  filterOptions: {
    display: (filterList, onChange, index, column) => (
      <FilterTextField
        filterVal={filterList[index]}
        queryKey="name"
        label="Name"
        onChange={(val) => onChange(val, index, column)}
      />
    ),
  },
};

/**
 * Configuration for our custom certificate filtering logic.
 */
export const certColumnOptions: MUIDataTableColumn['options'] = {
  sort: false,
  filterType: 'custom',
  // TODO: Verify with real cert data below
  customBodyRender: (value) => <CertificatesCell certificates={value as any} />,
  customFilterListOptions: {
    render: (value) => getCustomFilterChipLabel('Certification', value),
  },
  filterOptions: {
    display: (filterList, onChange, index, column) => (
      <CertificationsMultiselect
        activeCertFilters={filterList[index]}
        onChange={(val) => onChange(val, index, column)}
      />
    ),
  },
};

/**
 * Configuration for our custom country filtering logic.
 */
export const countryColumnOptions: MUIDataTableColumn['options'] = {
  filterType: 'custom',
  customBodyRender: getCellValOrDefault,
  customFilterListOptions: {
    render: (value) => getCustomFilterChipLabel('Country', value),
  },
  filterOptions: {
    display: (filterList, onChange, index, column, filterData) => (
      <FilterMultiselect
        // TODO: Currently this will only get the countries on the current page.
        options={filterData[index]}
        queryKey="country"
        label="Countries"
        onChange={(val) => onChange(val, index, column)}
        filterVals={filterList[index]}
      />
    ),
  },
};

/**
 * Configuration logic for the keys of our flattened `FactoryResData` object.
 * Other tables can expand upon this with additional columns, such as a link
 * to the factory profile page.
 *
 * The `name` key for each config object corresponds to the key of the object
 * array that is passed to the `data` prop on the table. The `label` key is
 * the string used as the column header.
 *
 * [Details on the various `options` configs can be found here](https://github.com/gregnb/mui-datatables#customize-columns).
 */
export const baseFactoryTableCols: MUIDataTableColumn[] = [
  { name: 'name', label: 'Name', options: nameColumnOptions },
  {
    name: 'certificates',
    label: 'Certifications',
    options: certColumnOptions,
  },
  {
    name: 'country',
    label: 'Country',
    options: countryColumnOptions,
  },
  {
    name: 'street_line_1',
    label: 'Street Line 1',
    options: getCustomSearchOptions('Street Line 1'),
  },
  {
    name: 'street_line_2',
    label: 'Street Line 2',
    options: getCustomSearchOptions('Street Line 2'),
  },
  {
    name: 'city',
    label: 'City',
    options: getCustomSearchOptions('City'),
  },
  {
    name: 'state_province',
    label: 'State/Province',
    options: getCustomSearchOptions('State/Province'),
  },
  {
    name: 'postal_code',
    label: 'Postal Code',
    options: getCustomSearchOptions('Postal Code'),
  },
];
