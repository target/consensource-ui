import { useLocation } from 'react-router-dom';
import qs, { ParseOptions } from 'query-string';

/**
 * Custom hook that parses the search query params from the URL.
 */
export const useSearchQuery = (options: ParseOptions = {}) => {
  const { search } = useLocation();
  return qs.parse(search, options);
};
