import { useState, useEffect } from 'react';
import { addBlockUpdateListener } from 'services/blockListener';
import { ApiRes } from 'services/api/utils';
import { FactoryReqParams } from 'services/api/factory';

/**
 * Hook function that queries an API endpoint, `fetchFn`,
 * which returns an array of data.
 *
 * Whenever a new block is created, `fetchFn` will be re-ran
 * and the exported state object will be updated with the latest values.
 */
export const useBlockSubscribe = <T>(
  fetchFn: (params?: FactoryReqParams) => Promise<ApiRes<T[]>>,
) => {
  const [data, setData] = useState<T[]>([]);

  const fetchData = async () => {
    try {
      const res = await fetchFn();
      setData(res.data);
    } catch {
      setData([]);
    }
  };

  useEffect(() => {
    addBlockUpdateListener(fetchData);
    fetchData();
  }, []);

  return data;
};
