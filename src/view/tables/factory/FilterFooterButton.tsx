import React, { useState } from 'react';
import { Button } from '@material-ui/core';
import { FilterList as FilterIcon } from '@material-ui/icons';

export interface FilterFooterButtonProps {
  /**
   * This prop is optional because the `applyNewFilters()`
   * function is not passed from the parent component if there
   * are no active table filters
   */
  applyNewFilters?: Function;
}

export const FilterFooterButton = ({
  applyNewFilters,
}: FilterFooterButtonProps) => {
  const [label, setLabel] = useState('Apply Filters');

  /**
   * On large data sets, `mui-datatables` freezes the UI and prevents
   * any sort of useful loading indicator. Using this timeout hack allows
   * us to at least set a loading text.
   */
  const onClick = () => {
    if (applyNewFilters) {
      setLabel('Loading...');
      setTimeout(() => {
        applyNewFilters();
      }, 100);
    }
  };

  return (
    <div style={{ marginTop: '40px' }}>
      <Button
        fullWidth
        variant="contained"
        color="primary"
        onClick={onClick}
        endIcon={<FilterIcon />}
      >
        {label}
      </Button>
    </div>
  );
};
