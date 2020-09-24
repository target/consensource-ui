import React from 'react';
import { TextField } from '@material-ui/core';
import { useInitialQueryVal } from './useInitalQueryVal';

export interface FilterTextFieldProps {
  label: string;
  onChange: (filterVal: string[]) => void;
  queryKey: string;
  filterVal: string[];
}

export const FilterTextField = ({
  label,
  onChange,
  queryKey,
  filterVal,
}: FilterTextFieldProps) => {
  useInitialQueryVal(queryKey, onChange);

  return (
    <TextField
      label={label}
      value={filterVal[0]}
      onChange={(e) => onChange([e.target.value])}
    />
  );
};
