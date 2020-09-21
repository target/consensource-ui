import React, { useState } from 'react';
import { TextField, StandardTextFieldProps } from '@material-ui/core';
import { useDecodedQueryString } from 'services/hooks';

export interface FilterTextFieldProps {
  label: string;
  onChange: (filterVal: string[]) => void;
  queryKey: string;
}

export const FilterTextField = ({
  label,
  onChange,
  queryKey,
}: FilterTextFieldProps) => {
  const queryParams = useDecodedQueryString({
    parseNumbers: true,
    arrayFormat: 'comma',
  });
  const [val, setVal] = useState(queryParams[queryKey]);

  const handleChange: StandardTextFieldProps['onChange'] = (e) => {
    setVal(e.target.value);
    onChange([e.target.value]);
  };

  return <TextField label={label} value={val} onChange={handleChange} />;
};
