import React from 'react';
import {
  MUIDataTableOptions,
  MUIDataTableColumn,
  MUIDataTableColumnOptions,
  MUIDataTableChip,
} from 'mui-datatables';
import { FactoryResData } from 'services/api';
import { TextField } from '@material-ui/core';
import { FilterCertififcatesDropdown } from './FilterCertififcatesDropdown';
import { CertificatesCell } from './CertificatesCell';

export const textLabels: MUIDataTableOptions['textLabels'] = {
  body: {
    noMatch: 'No factories found',
  },
};

export const filterChipProps: MUIDataTableChip = {
  color: 'secondary',
  variant: 'default',
};

/**
 * Expands all properties of `FactoryResData`
 */
export const getRowFromFactory = ({
  name,
  address,
  certificates,
}: FactoryResData) => {
  if (name === 'pattest') {
    certificates = [
      {
        id: 'test1',
        certifying_body_id: 'test1',
        certifying_body: 'test1',
        factory_id: 'test1',
        factory_name: 'test1',
        standard_id: 'test1',
        standard_name: 'test1',
        standard_version: 'test1',
        valid_from: 0,
        valid_to: 0,
        assertion_id: 'test1',
      },
      {
        id: 'test1',
        certifying_body_id: 'test1',
        certifying_body: 'test1',
        factory_id: 'test1',
        factory_name: 'test1',
        standard_id: 'test1',
        standard_name: 'test2',
        standard_version: 'test1',
        valid_from: 0,
        valid_to: 0,
        assertion_id: 'test1',
      },
    ];
  }

  // let certificatesStr;

  // if (certificates && certificates.length > 0) {
  //   certificatesStr = certificates
  //     .reduce(
  //       (prevVal, { standard_name }) => `${prevVal}, ${standard_name}`,
  //       '',
  //     )
  //     .substring(1);
  // } else {
  //   certificatesStr = 'None';
  // }

  return { name, certificates: JSON.stringify(certificates), ...address };
};

/**
 * If the cell has a value, returns that value. Else,
 * returns a placeholder value.
 */
export const getCellValOrDefault = (value: string) => value || '-';

export const getCustomFilterChip = (
  colLabel: string,
  values: string | string[],
) => {
  if (typeof values === 'string') {
    return `${colLabel}: ${values}`;
  }

  return values.map((val) => `${colLabel}: ${val}`);
};

/**
 * Configuration for custom search filter fields.
 *
 * TODO: Use a debounced search value instead of the customFilterFooter.
 */
export const getCustomSearchOptions = (
  colLabel: string,
): MUIDataTableColumnOptions => ({
  filter: true,
  filterType: 'textField',
  customBodyRender: getCellValOrDefault,
  customFilterListOptions: {
    render: (value) => getCustomFilterChip(colLabel, value),
    update: (filterList, filterPos, index) => {
      const newFilterList = filterList;
      newFilterList[index] = [];

      return newFilterList;
    },
  },
  filterOptions: {
    logic: (prop, filterValue) => {
      if (filterValue.length === 0) return false;

      const idx = filterValue.findIndex((filter) =>
        prop.toLowerCase().includes(filter.toLowerCase()),
      );

      return idx === -1;
    },
    display: (filterList, onChange, index, column) => {
      return (
        <TextField
          label={column.label}
          onChange={(e) => onChange([e.target.value], index, column)}
        />
      );
    },
  },
});

export const baseFactoryTableCols: MUIDataTableColumn[] = [
  { name: 'name', label: 'Name', options: getCustomSearchOptions('Name') },
  {
    name: 'certificates',
    label: 'Certifications',
    options: {
      sort: false,
      filterType: 'custom',
      customBodyRender: (value) => (
        <CertificatesCell certificates={JSON.parse(value)} />
      ),
      customFilterListOptions: {
        render: (value) => getCustomFilterChip('Certifications', value),
      },
      filterOptions: {
        logic: (prop, filterValue) => {
          if (filterValue.length === 0) return false;

          const idx = filterValue.findIndex((filter) =>
            prop.toLowerCase().includes(filter.toLowerCase()),
          );

          return idx === -1;
        },
        display: (filterList, onChange, index, column) => (
          <FilterCertififcatesDropdown
            activeCertFilters={filterList[index]}
            onChange={onChange}
            index={index}
            column={column}
          />
        ),
      },
    },
  },
  {
    name: 'country',
    label: 'Country',
    options: {
      filterType: 'dropdown',
      customBodyRender: getCellValOrDefault,
      customFilterListOptions: {
        render: (value) => getCustomFilterChip('Country', value),
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
