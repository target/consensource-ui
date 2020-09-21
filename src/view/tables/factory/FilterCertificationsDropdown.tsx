import React from 'react';
import { useQuery } from 'react-query';
import { fetchAllStandards } from 'services/api';
import { useDecodedQueryString } from 'services/hooks';
import {
  Select,
  MenuItem,
  InputLabel,
  Checkbox,
  ListItemText,
  CircularProgress,
  makeStyles,
  createStyles,
} from '@material-ui/core';
import { MUIDataTableColumn } from 'mui-datatables';
import { LoadingWithMinDisplay, WarningIconError } from 'view/components';

export interface FilterCertificationsDropdown {
  activeCertFilters: string[];
  onChange: (
    value: string | string[],
    index: number,
    column: MUIDataTableColumn,
  ) => void;
  index: number;
  column: MUIDataTableColumn;
}

const useStyles = makeStyles(
  createStyles({
    errorText: {
      paddingTop: 10,
    },
  }),
);

// TODO: Get certs from query string
export const FilterCertificationsDropdown = ({
  activeCertFilters,
  onChange,
  index,
  column,
}: FilterCertificationsDropdown) => {
  const classes = useStyles();
  const { data, isLoading, error } = useQuery('fetchAllStandards', () =>
    fetchAllStandards(),
  );

  /**
   * Parses the `certificates` key from the URL query params,
   * and returns an array of strings.
   *
   * The certificates key must be a string with each certificate
   * separated by a comma.
   *
   * For example: `?certificates=GOTS,FSC`
   */
  const getCertFiltersFromQueryParams = () => {
    const queryParams = useDecodedQueryString({ arrayFormat: 'comma' });

    if (queryParams.certificates) {
      const { certificates } = queryParams;

      return typeof certificates === 'string'
        ? [certificates]
        : (certificates as string[]);
    }

    return [];
  };

  const filtersWithQueryParams = [
    ...activeCertFilters,
    ...getCertFiltersFromQueryParams(),
  ];

  return (
    <LoadingWithMinDisplay
      isLoading={isLoading}
      loadingIndicator={<CircularProgress size={40} />}
    >
      {error && (
        <div className={classes.errorText}>
          <WarningIconError typeVariant="body2" iconFontSize="small">
            Failed to load certifications
          </WarningIconError>
        </div>
      )}
      {data && (
        <>
          <InputLabel>Certifications</InputLabel>
          <Select
            multiple
            fullWidth
            value={filtersWithQueryParams}
            name="Certifications"
            renderValue={(selected) => (selected as string[]).join(', ')}
            onChange={(e) => onChange(e.target.value as string, index, column)}
            MenuProps={{ variant: 'menu' }} // https://github.com/mui-org/material-ui/issues/19245#issuecomment-609820260
          >
            {data.data.map(({ standard_name }) => (
              <MenuItem value={standard_name} key={standard_name}>
                <Checkbox
                  data-description="table-filter"
                  color="primary"
                  checked={filtersWithQueryParams.includes(standard_name)}
                  value={standard_name}
                />
                <ListItemText primary={standard_name} />
              </MenuItem>
            ))}
          </Select>
        </>
      )}
    </LoadingWithMinDisplay>
  );
};
