import { useState, useEffect } from 'react';
import {
  addBlockUpdateListener,
  removeBlockUpdateListener,
} from 'services/blockListener';
import { BaseApiRes } from 'services/api/utils';

/**
 * Hook function that queries an API endpoint, `fetchFn`,
 * which returns an array of data. Accepts an optional params object.
 *
 * Whenever a new block is created, `fetchFn` will re-run
 * and the exported state object will be updated with the latest values.
 *
 * TODO: Logic to iterate through paging options and make subsequent fetches
 */
export const useBlockSubscribe = <T, S = {}>(
  fetchFn: (params?: S) => Promise<BaseApiRes<T[]>>,
  params?: S,
) => {
  const [data, setData] = useState<T[]>([]);

  const fetchData = async () => {
    try {
      const res = await fetchFn(params);
      setData(res.data);
    } catch {
      setData([]);
    }
  };

  useEffect(() => {
    addBlockUpdateListener(fetchData);
    fetchData();

    return removeBlockUpdateListener(fetchData);
  }, []);

  return data;
};
