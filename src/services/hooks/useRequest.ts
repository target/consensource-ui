import React, { useState, useEffect } from 'react';

export function useRequest(requestFunction: Function) {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({});

  useEffect(() => {
    const fetchFunction = async () => {
      try {
        setLoading(true);
        const response = await requestFunction();
        setData(response);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchFunction();
  }, []);

  return { data, loading, error };
}
