import { useEffect } from 'react';
import { useSearchQuery } from 'services/hooks';
import { parseOptions, convertStrToArray } from '../../utils';

/**
 * Custom hook that will parse query filter values from the URL
 * and invoke the `onChange()` method to intialize table filters.
 *
 * @param queryKey The key of the query param in the URL
 * @param onChange Method that is invoked to populate table filters,
 * passed down from the `display()` column config
 */
export const useInitialQueryVal = (
  queryKey: string,
  onChange: (filterVal: string[]) => void,
) => {
  const queryParams = useSearchQuery(parseOptions);

  useEffect(() => {
    const queryVal = queryParams[queryKey];

    if (queryVal) {
      onChange(convertStrToArray(queryVal));
    }
  }, []);
};
