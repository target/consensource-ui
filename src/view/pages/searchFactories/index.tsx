import React, { useState, useEffect } from 'react';
import {
  fetchAllFactories,
  FactoryResData,
  FactoryResAddressData,
} from 'services/api/factory';
import MaterialTable from 'material-table';
import { defaultIcons } from 'view/components/factoriesTable';

const factoryAddressCols: FactoryResAddressData = {
  street_line_1: 'Address',
  city: 'City',
  state_province: 'State Province ',
  country: 'Country',
  postal_code: 'Postal Code',
};

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

  const columns = Object.entries(factoryAddressCols).map(([field, title]) => {
    return { title, field };
  });

  /**
   * Returns the address row with `street_line_1` and `street_line_2` concatenated
   */
  const getRowFromAddress = (address: FactoryResAddressData) => {
    return {
      ...address,
      street_line_1: `${address.street_line_1} ${address.street_line_2}`,
    };
  };

  return (
    <div>
      <div>{errMsg}</div>
      <MaterialTable
        isLoading={!factories}
        icons={defaultIcons}
        columns={columns}
        data={factories.map(({ address }) => getRowFromAddress(address))}
        title="Factories"
      />
    </div>
  );
}
