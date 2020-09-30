import { ParseOptions, StringifyOptions } from 'query-string';

export const DEFAULT_ROWS_PER_PAGE = 100;

export const queryOpts: ParseOptions | StringifyOptions = {
  arrayFormat: 'comma',
};

/**
 * Utility function to convert a string to an array, or return
 * the original param if an array was passed.
 *
 * This operation is frequent when decoding URL query params.
 */
export const convertStrToArray = (val: string | string[]) => {
  return typeof val === 'string' ? [val] : val;
};

/**
 * Given a query param, attempt to parse the string to an int. Return
 * `null` if the operation fails, or if the `val` parameter was not a string.
 */
export const getIntValFromQueryParam = (val: string | string[] | null) => {
  if (val && typeof val === 'string') {
    const parsedVal = parseInt(val, 10);

    if (parsedVal) {
      return parsedVal;
    }
  }

  return null;
};
