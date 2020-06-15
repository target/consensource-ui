import React, { useState, useEffect } from 'react';
import { fetchAllFactories, FactoryResData } from 'services/api/factory';
import MaterialTable from 'material-table';
import { defaultIcons, CertDialogButton } from 'view/widgets/tables/factory';

export interface IFactoryColumnVals {
  name: string;
  address: string;
  city: string;
  state_province?: string;
  country: string;
  postal_code?: string;
  certifications: JSX.Element[] | string;
}

export default function SearchFactories() {
  const [factories, setFactories] = useState<FactoryResData[]>([]);
  const [errMsg, setErrMsg] = useState('');

  useEffect(() => {
    const fetchFactories = async () => {
      try {
        const { data: factoryList } = await fetchAllFactories();
        setFactories(factoryList);
      } catch ({ message }) {
        setErrMsg(message);
      }
    };

    fetchFactories();
  }, []);

  const columns = [
    { field: 'name', title: 'Name' },
    { field: 'certifications', title: 'Certifications' },
    { field: 'address', title: 'Address' },
    { field: 'city', title: 'City' },
    { field: 'state_province', title: 'State Province ' },
    { field: 'country', title: 'Country' },
    { field: 'postal_code', title: 'Postal Code' },
  ];

  /**
   * Returns the address row with `street_line_1` and `street_line_2` concatenated
   */
  const getRowFromFactoryRes = ({
    name,
    address,
    certificates,
  }: FactoryResData): IFactoryColumnVals => {
    const certifications = certificates
      ? certificates.map((certificate) => (
          <CertDialogButton certificate={certificate} />
        ))
      : '---';

    return {
      ...address,
      certifications,
      name,
      address: `${address.street_line_1} ${address.street_line_2}`,
    };
  };

  return (
    <div>
      <div>{errMsg}</div>
      <MaterialTable
        isLoading={!factories}
        icons={defaultIcons}
        columns={columns}
        data={factories.map(getRowFromFactoryRes)}
        title="Factories"
      />
    </div>
  );
}
