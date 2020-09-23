import { MUIDataTableOptions, MUIDataTableChip } from 'mui-datatables';
import { ParseOptions, StringifyOptions } from 'query-string';

export const DEFAULT_ROWS_PER_PAGE = 15;

export const textLabels: MUIDataTableOptions['textLabels'] = {
  body: {
    noMatch: 'No factories found',
  },
};

export const parseOptions: ParseOptions = {
  parseNumbers: true,
  arrayFormat: 'comma',
};

export const stringifyOptions: StringifyOptions = {
  arrayFormat: 'comma',
  encode: false, // We are handling encoding/decoding ourselves
};

/**
 * Default props for the filter chips displayed in the
 * `<TableFilterList />`.
 */
export const filterChipProps: MUIDataTableChip = {
  color: 'secondary',
  variant: 'default',
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
