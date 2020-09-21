import { MUIDataTableOptions, MUIDataTableChip } from 'mui-datatables';
import { useDecodedQueryString } from 'services/hooks';
import { FactoryResData, FactoryReqParams } from 'services/api';
import { baseFactoryTableCols } from './columns';

export const DEFAULT_ROWS_PER_PAGE = 15;

export const textLabels: MUIDataTableOptions['textLabels'] = {
  body: {
    noMatch: 'No factories found',
  },
};

/**
 * Default query parameters. The `expand` option includes
 * certificates in the factory data.
 */
export const baseParams: FactoryReqParams = {
  expand: true,
  limit: DEFAULT_ROWS_PER_PAGE,
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
 * Flattens and expands all properties of `FactoryResData`. This
 * is required because `mui-datatables` expects a flat object to
 * populate the table.
 *
 * The `certififcates` array is stringified because the filter
 * components require an array of strings as parameters. The
 * certificates can be parsed back into objects and used in
 * the filters however.
 */
export const getRowFromFactory = ({
  name,
  address,
  certificates,
}: FactoryResData) => {
  return { name, certificates: JSON.stringify(certificates), ...address };
};

/**
 * Return a list of table filters based on the query string
 * of the current location. This is needed to populate the
 * `<TableFilterList />` component with the appropriate
 * filter chips (filters such as `limit` which are not in the
 * `baseFactoryTableCols` object are excluded).
 */
export const getFilterListFromQueryParams = () => {
  const queryParams = useDecodedQueryString({
    arrayFormat: 'comma',
    parseNumbers: true,
  });

  const filterList = baseFactoryTableCols.map(({ name: colName }) => {
    const queryParamKey = Object.keys(queryParams).find(
      (key) => colName === key,
    );

    if (queryParamKey) {
      const queryParamVal = queryParams[queryParamKey];

      if (!queryParamVal) {
        return [];
      }

      return typeof queryParamVal === 'string'
        ? [queryParamVal]
        : queryParamVal;
    }

    return [];
  });

  return filterList;
};
