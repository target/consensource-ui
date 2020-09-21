import { useLocation } from 'react-router-dom';
import qs, { ParseOptions } from 'query-string';

/**
 * Custom hook that parses the decoded URI query param.
 *
 * TODO: Fix TS definition to take method overloads on `options`
 * into account.
 */
export const useDecodedQueryString = (options?: ParseOptions) => {
  const { search } = useLocation();

  return qs.parse(decodeURIComponent(search), options);
};
