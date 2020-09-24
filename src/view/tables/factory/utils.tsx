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
export const convertStrToArray = (val: string[] | string) => {
  return typeof val === 'string' ? [val] : val;
};
