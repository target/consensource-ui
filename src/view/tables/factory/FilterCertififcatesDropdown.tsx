import React from 'react';
import { useQuery } from 'react-query';
import { fetchAllStandards } from 'services/api';
import {
  Select,
  MenuItem,
  InputLabel,
  Checkbox,
  ListItemText,
} from '@material-ui/core';
import { LoadingWithMinDisplay } from 'view/components';

export interface FilterCertififcatesDropdown {
  activeCertFilters: string[];
  onChange: Function;
  index: number;
  column: any; // TODO: narrow
}

// Comment about how both the filterList and filterData provide stringified values
// for objects, so we need to fetch certs from the db
export const FilterCertififcatesDropdown = ({
  activeCertFilters,
  onChange,
  index,
  column,
}: FilterCertififcatesDropdown) => {
  const { data, isLoading, error } = useQuery('fetchAllStandards', () =>
    fetchAllStandards(),
  );

  return (
    <>
      <InputLabel>Certifications</InputLabel>
      <Select
        multiple
        fullWidth
        value={[]}
        name="Certifications"
        renderValue={(selected) => (selected as string[]).join(', ')}
        onChange={(e) => onChange(e.target.value, index, column)}
      >
        <LoadingWithMinDisplay isLoading={isLoading}>
          {error && <div>No certs</div>}
          {data &&
            data.data.map(({ standard_name }) => {
              return (
                <MenuItem value={standard_name} key={standard_name}>
                  <Checkbox
                    data-description="table-filter"
                    color="primary"
                    checked={activeCertFilters.includes(standard_name)}
                    value={standard_name}
                  />
                  <ListItemText primary={standard_name} />
                </MenuItem>
              );
            })}
        </LoadingWithMinDisplay>
      </Select>
    </>
  );
};
