import React from 'react';
import {
  Select,
  MenuItem,
  InputLabel,
  Checkbox,
  ListItemText,
} from '@material-ui/core';
import { FactoryReqParams } from 'services/api';
import { useInitialQueryVal } from './useInitalQueryVal';

export interface FilterMultiselectProps {
  options: string[];
  queryKey: keyof FactoryReqParams;
  label: string;
  filterVals: string[];
  onChange: (value: string[]) => void;
}

export const FilterMultiselect = ({
  options,
  queryKey,
  label,
  onChange,
  filterVals,
}: FilterMultiselectProps) => {
  useInitialQueryVal(queryKey, onChange);

  return (
    <>
      <InputLabel>{label}</InputLabel>
      <Select
        multiple
        fullWidth
        value={filterVals}
        name={label}
        renderValue={(selected) => (selected as string[]).join(', ')}
        onChange={(e) => {
          onChange(e.target.value as string[]);
        }}
        MenuProps={{ variant: 'menu' }} // https://github.com/mui-org/material-ui/issues/19245#issuecomment-609820260
      >
        {options.map((option) => (
          <MenuItem value={option} key={option}>
            <Checkbox
              data-description="table-filter"
              color="primary"
              checked={filterVals.includes(option)}
              value={option}
            />
            <ListItemText primary={option} />
          </MenuItem>
        ))}
      </Select>
    </>
  );
};
