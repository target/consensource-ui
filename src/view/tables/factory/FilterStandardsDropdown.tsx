import React from 'react';
import { useQuery } from 'react-query';
import { fetchAllStandards } from 'services/api';
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
import { LoadingWithMinDisplay, WarningIconError } from 'view/components';

export interface FilterStandardsDropdown {
  activeStandardFilters: string[];
  onChange: Function;
  index: number;
  column: any;
}

const useStyles = makeStyles(
  createStyles({
    errorText: {
      paddingTop: 10,
    },
  }),
);

export const FilterStandardsDropdown = ({
  activeStandardFilters,
  onChange,
  index,
  column,
}: FilterStandardsDropdown) => {
  const classes = useStyles();
  const { data, isLoading, error } = useQuery('fetchAllStandards', () =>
    fetchAllStandards(),
  );

  return (
    <LoadingWithMinDisplay
      isLoading={isLoading}
      loadingIndicator={<CircularProgress size={40} />}
    >
      {error && (
        <div className={classes.errorText}>
          <WarningIconError typeVariant="body2" iconFontSize="small">
            Failed to load standards
          </WarningIconError>
        </div>
      )}
      {data && (
        <>
          <InputLabel>Standards</InputLabel>
          <Select
            multiple
            fullWidth
            value={activeStandardFilters}
            name="Standards"
            renderValue={(selected) => (selected as string[]).join(', ')}
            onChange={(e) => onChange(e.target.value, index, column)}
            MenuProps={{ variant: 'menu' }} // https://github.com/mui-org/material-ui/issues/19245#issuecomment-609820260
          >
            {data.data.map(({ standard_name }) => {
              return (
                <MenuItem value={standard_name} key={standard_name}>
                  <Checkbox
                    data-description="table-filter"
                    color="primary"
                    checked={activeStandardFilters.includes(standard_name)}
                    value={standard_name}
                  />
                  <ListItemText primary={standard_name} />
                </MenuItem>
              );
            })}
          </Select>
        </>
      )}
    </LoadingWithMinDisplay>
  );
};
