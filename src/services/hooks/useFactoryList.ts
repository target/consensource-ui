import { useState, useEffect } from 'react';
import { fetchAllFactories, FactoryResData } from 'services/api/factory';
import { addBlockUpdateListener } from 'services/blockListener';

export const useFactoryList = () => {
  const [factories, setFactories] = useState<FactoryResData[]>([]);

  const fetchFactories = async () => {
    try {
      const { data: factoryList } = await fetchAllFactories();
      setFactories(factoryList);
    } catch {
      setFactories([]);
    }
  };

  useEffect(() => {
    addBlockUpdateListener(fetchFactories);
    fetchFactories();
  }, []);

  return factories;
};
