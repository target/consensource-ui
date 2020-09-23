import { MUIDataTableOptions, MUIDataTableChip } from 'mui-datatables';

export const DEFAULT_ROWS_PER_PAGE = 100;

export const textLabels: MUIDataTableOptions['textLabels'] = {
  body: {
    noMatch: 'No factories found',
  },
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
