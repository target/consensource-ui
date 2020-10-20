import React, { useState } from 'react';
import { Button } from '@material-ui/core';
import { FilterList as FilterIcon } from '@material-ui/icons';

export interface FilterFooterButtonProps {
  /**
   * This prop is optional because the `applyNewFilters()`
   * function is not passed from the parent component if there
   * are no active table filters
   */
  applyNewFilters?: (...args: any[]) => any;
}

/**
 * On large data sets, `mui-datatables` freezes the UI and prevents
 * any sort of useful loading indicator. Using this timeout hack allows
 * us to at least set a loading text.
 */
export const FILTER_TIMEOUT_MS = 100;

export const FilterFooterButton = ({
  applyNewFilters,
}: FilterFooterButtonProps) => {
  const [label, setLabel] = useState('Apply Filters');

  const onClick = () => {
    if (applyNewFilters) {
      setLabel('Loading...');
      setTimeout(() => {
        applyNewFilters();
      }, FILTER_TIMEOUT_MS);
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
        title="apply filters"
      >
        {label}
      </Button>
    </div>
  );
};
