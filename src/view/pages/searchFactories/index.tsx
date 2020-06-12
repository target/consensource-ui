import React, { useState, useEffect } from 'react';
import { fetchAllFactories, FactoryResData } from 'services/api/factory';
import MaterialTable from 'material-table';
import { defaultIcons } from 'view/components/factoriesTable';
import Button from '@material-ui/core/Button';

export interface IFactoryColumnVals {
  address: string;
  city: string;
  state_province?: string;
  country: string;
  postal_code?: string;
  certifications: JSX.Element[] | null;
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
    { field: 'address', title: 'Address' },
    { field: 'city', title: 'City' },
    { field: 'state_province', title: 'State Province ' },
    { field: 'country', title: 'Country' },
    { field: 'postal_code', title: 'Postal Code' },
    { field: 'certifications', title: 'Certifications' },
  ];

  /**
   * Returns the address row with `street_line_1` and `street_line_2` concatenated
   */
  const getRowFromFactoryRes = ({
    address,
    certificates,
  }: FactoryResData): IFactoryColumnVals => {
    const certifications =
      certificates &&
      certificates.map((cert) => <Button>{cert.standard_name}</Button>);

    return {
      ...address,
      certifications,
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
