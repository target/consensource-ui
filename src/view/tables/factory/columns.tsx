import React from 'react';
import { MUIDataTableColumn, MUIDataTableColumnOptions } from 'mui-datatables';
import { FilterCertificationsDropdown } from './FilterCertificationsDropdown';
import { CertificatesCell } from './CertificatesCell';
import { FilterTextField } from './FilterTextField';

/**
 * Used in the `customBodyRender` config. If an empty string is passed,
 * replace it with a placeholder text (`'-'`).
 */
export const getCellValOrDefault = (value: string) => value || '-';

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
 *
 * TODO: Use a debounced search value instead of the customFilterFooter.
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
    display: (filterList, onChange, index, column) => (
      <FilterTextField
        queryKey={column.name}
        label={column.label}
        onChange={(val) => onChange(val, index, column)}
      />
    ),
  },
});

/**
 * Configuration logic for our custom certificate filtering logic.
 */
export const certColumnOptions: MUIDataTableColumn['options'] = {
  sort: false,
  filterType: 'custom',
  customBodyRender: (value) => (
    <CertificatesCell certificates={JSON.parse(value)} />
  ),
  customFilterListOptions: {
    render: (value) => getCustomFilterChipLabel('Certification', value),
  },
  filterOptions: {
    display: (filterList, onChange, index, column) => (
      <FilterCertificationsDropdown
        activeCertFilters={filterList[index]}
        onChange={onChange}
        index={index}
        column={column}
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
  { name: 'name', label: 'Name', options: getCustomSearchOptions('Name') },
  {
    name: 'certificates',
    label: 'Certifications',
    options: certColumnOptions,
  },
  {
    name: 'country',
    label: 'Country',
    options: {
      filterType: 'multiselect',
      customBodyRender: getCellValOrDefault,
      customFilterListOptions: {
        render: (value) => getCustomFilterChipLabel('Country', value),
      },
    },
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
