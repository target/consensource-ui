import React from 'react';
import { FactoryResData, fetchAllFactories } from 'services/api/factory';
import MaterialTable from 'material-table';
import { defaultIcons } from 'view/tables/factory/icons';
import { CertDialogButton } from 'view/tables/factory/CertDialogButton';
import { useBlockSubscribe } from 'services/hooks/useBlockSubscribe';

export interface IFactoryColumnVals {
  name: string;
  address: string;
  city: string;
  state_province?: string;
  country: string;
  postal_code?: string;
  certifications: JSX.Element[] | string;
}

export function FactoriesTable() {
  const factories = useBlockSubscribe<FactoryResData>(fetchAllFactories);

  const columns = [
    { field: 'name', title: 'Name' },
    { field: 'certifications', title: 'Certifications' },
    { field: 'address', title: 'Address' },
    { field: 'city', title: 'City' },
    { field: 'state_province', title: 'State Province ' },
    { field: 'country', title: 'Country' },
    { field: 'postal_code', title: 'Postal Code' },
  ];

  const localization = {
    body: { emptyDataSourceMessage: 'No factories found' },
  };

  const getRowFromFactoryRes = ({
    name,
    address,
    certificates,
  }: FactoryResData): IFactoryColumnVals => {
    const certifications = certificates
      ? certificates.map((certificate) => (
          <CertDialogButton certificate={certificate} />
        ))
      : '-';

    return {
      ...address,
      certifications,
      name,
      state_province: address.state_province || '-',
      postal_code: address.postal_code || '-',
      address: `${address.street_line_1} ${address.street_line_2 || ''}`,
    };
  };

  const rows = factories.map(getRowFromFactoryRes);

  return (
    <MaterialTable
      isLoading={!factories}
      icons={defaultIcons}
      columns={columns}
      data={rows}
      title="Factories"
      localization={localization}
    />
  );
}
