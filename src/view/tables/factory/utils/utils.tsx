import React from 'react';
import { MUIDataTableOptions, MUIDataTableColumn } from 'mui-datatables';
import { CertResData, FactoryResWithCertsData } from 'services/api';

export const DEFAULT_ROWS_PER_PAGE = 15;

export const textLabels: MUIDataTableOptions['textLabels'] = {
  body: {
    noMatch: 'No factories found',
  },
};

/**
 * Expands all properties of `FactoryResWithCertsData`
 */
export const getRowFromFactory = ({
  name,
  address,
  certificates,
}: FactoryResWithCertsData) => {
  return {
    name,
    certificates,
    ...address,
  };
};

/**
 * Get the render element for the `Certificates` cell in our table.
 * If the factory has certificates, display them as an unordered list.
 */
const getCertCell = (certificates: CertResData[]) => {
  return (
    <ul>
      {certificates.map(({ standard_name }) => (
        <li>{standard_name}</li>
      ))}
    </ul>
  );
};

export const baseFactoryTableCols: MUIDataTableColumn[] = [
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
