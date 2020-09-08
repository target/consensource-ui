import React from 'react';
import { MUIDataTableOptions, MUIDataTableColumn } from 'mui-datatables';
import { CertResData, FactoryResData } from 'services/api';
import { CertificatesCell } from './CertificatesCell';

export const DEFAULT_ROWS_PER_PAGE = 15;

export const textLabels: MUIDataTableOptions['textLabels'] = {
  body: {
    noMatch: 'No factories found',
  },
};

/**
 * Expands all properties of `FactoryResData`
 */
export const getRowFromFactory = ({
  name,
  address,
  certificates,
}: FactoryResData) => ({ name, certificates, ...address });

/**
 * If the cell has a value, returns that value. Else,
 * returns a placeholder value.
 */
export const getCellValOrDefault = (value: string) => value || '-';

export const baseFactoryTableCols: MUIDataTableColumn[] = [
  { name: 'name', label: 'Name', options: { filterType: 'textField' } },
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
    options: { filterType: 'textField', customBodyRender: getCellValOrDefault },
  },
  {
    name: 'street_line_2',
    label: 'Street Line 2',
    options: {
      filterType: 'textField',
      customBodyRender: getCellValOrDefault,
    },
  },
  {
    name: 'city',
    label: 'City',
    options: {
      filterType: 'textField',
      customBodyRender: getCellValOrDefault,
    },
  },
  {
    name: 'state_province',
    label: 'State/Province',
    options: { filterType: 'textField', customBodyRender: getCellValOrDefault },
  },
  {
    name: 'country',
    label: 'Country',
    options: { filterType: 'dropdown', customBodyRender: getCellValOrDefault },
  },
  {
    name: 'postal_code',
    label: 'Postal Code',
    options: { filterType: 'textField', customBodyRender: getCellValOrDefault },
  },
];
