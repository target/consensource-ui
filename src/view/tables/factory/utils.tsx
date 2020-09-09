import React from 'react';
import {
  MUIDataTableOptions,
  MUIDataTableColumn,
  MUIDataTableColumnOptions,
  MUIDataTableChip,
} from 'mui-datatables';
import { CertResData, FactoryResData } from 'services/api';
import { TextField, Button } from '@material-ui/core';
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
}: FactoryResData) => ({ name, certificates, ...address });

export const CustomFilterFooterButton = ({
  applyFilters,
}: {
  applyFilters?: Function;
}) => {
  return (
    <div style={{ marginTop: '40px' }}>
      <Button
        variant="contained"
        color="primary"
        fullWidth
        onClick={() => applyFilters && applyFilters()}
      >
        Apply Filters
      </Button>
    </div>
  );
};

/**
 * If the cell has a value, returns that value. Else,
 * returns a placeholder value.
 */
export const getCellValOrDefault = (value: string) => value || '-';

export const getCustomFilterChip = (colLabel: string, value: string) =>
  `${colLabel}: ${value}`;

/**
 * Configuration for custom search filter fields.body
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
    logic: (prop: string, filterValue: any[]) => {
      if (filterValue.length === 0) return false;

      const idx = filterValue.findIndex((filter) =>
        prop.toLowerCase().includes(filter.toLowerCase()),
      );

      return idx === -1;
    },
    display: (
      filterList: string[],
      onChange: any,
      index: number,
      column: any,
    ) => {
      return (
        <TextField
          label={column.label}
          value={filterList[index]}
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
      customBodyRender: (value: CertResData[]) => (
        <CertificatesCell certificates={value} />
      ),
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
    options: getCustomSearchOptions('Street Line 2'),
  },
  {
    name: 'state_province',
    label: 'State/Province',
    options: getCustomSearchOptions('State/Province'),
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
    name: 'postal_code',
    label: 'Postal Code',
    options: getCustomSearchOptions('Postal Code'),
  },
];
